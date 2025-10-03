/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/** Product types */
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  category?: string;
}

export interface ProductsResponse {
  items: Product[];
}

/** Chat types */
export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface ChatRequest {
  messages: Pick<ChatMessage, "role" | "content">[];
}

export interface ChatResponse {
  message: ChatMessage;
}
