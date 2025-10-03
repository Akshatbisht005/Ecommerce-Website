import { useCallback, useMemo, useState } from "react";
import type { ChatMessage, ChatRequest, ChatResponse } from "@shared/api";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (content: string) => {
    setError(null);
    const user: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: Date.now(),
    };
    setMessages((m) => [...m, user]);

    setLoading(true);
    try {
      const body: ChatRequest = { messages: [{ role: "user", content }] };
      const res = await fetch(`/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as ChatResponse;
      setMessages((m) => [...m, data.message]);
    } catch (e: any) {
      setError(e?.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  return useMemo(
    () => ({ messages, send, loading, error }),
    [messages, send, loading, error],
  );
}
