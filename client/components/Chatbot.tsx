import { FormEvent, useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Chatbot() {
  const { messages, send, loading, error } = useChat();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, open]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    send(text);
    setValue("");
  }

  return (
    <div id="chatbot" className="fixed bottom-6 right-6 z-50">
      <div className={cn("w-[88vw] sm:w-[380px] card p-0 overflow-hidden transition-all", open ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0")}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <MessageCircle className="size-5" />
            <p className="font-semibold">Ablis Assistant</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground" aria-label="Close chat" onClick={() => setOpen(false)}>
            <X className="size-5" />
          </button>
        </div>
        <div className="h-[320px] overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-background to-secondary/30">
          {messages.length === 0 && (
            <div className="text-sm text-muted-foreground">
              Ask about products, shipping times, or recommendations. I can help you find the right items for the US market.
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start") }>
              <div className={cn("max-w-[80%] rounded-2xl px-3 py-2 text-sm", m.role === "user" ? "bg-primary text-primary-foreground" : "glass")}>{m.content}</div>
            </div>
          ))}
          {error && <div className="text-xs text-destructive">{error}</div>}
          <div ref={endRef} />
        </div>
        <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 border-t">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" size="icon" disabled={loading} className="rounded-full">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
      <Button size="lg" className="rounded-full shadow-lg" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="chatbot">
        <MessageCircle className="mr-2 size-5" /> Chat
      </Button>
    </div>
  );
}
