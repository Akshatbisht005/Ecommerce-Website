import type { RequestHandler } from "express";
import type { ChatRequest, ChatResponse, ChatMessage } from "@shared/api";

export const handleChat: RequestHandler = async (req, res) => {
  const body = req.body as ChatRequest | undefined;
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const user = body.messages[body.messages.length - 1];

  const apiKey = process.env.OPENAI_API_KEY;
  try {
    if (apiKey) {
      const openaiRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful ecommerce assistant for a US-market dropshipping website called Ablis. Be concise, friendly, and on-brand.",
              },
              ...body.messages,
            ],
            temperature: 0.7,
            max_tokens: 200,
          }),
        },
      );
      if (!openaiRes.ok) {
        const text = await openaiRes.text();
        throw new Error(text);
      }
      const json = await openaiRes.json();
      const content = json.choices?.[0]?.message?.content ?? "";
      const message: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content,
        createdAt: Date.now(),
      };
      const response: ChatResponse = { message };
      return res.json(response);
    }
  } catch (e) {
    console.error("OpenAI error", e);
  }

  // Fallback local response (no API key)
  const fallback: ChatMessage = {
    id: crypto.randomUUID(),
    role: "assistant",
    createdAt: Date.now(),
    content:
      `Here to help with Ablis products, shipping, and recommendations for the US market. You asked: "${user.content}"\n\n` +
      "Tip: We offer 2-5 day delivery across the US and curated trending items.",
  };
  const response: ChatResponse = { message: fallback };
  return res.json(response);
};
