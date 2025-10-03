import { RequestHandler } from "express";
import type { ProductsResponse, Product } from "@shared/api";

const catalog: Product[] = [
  {
    id: "airpods-case",
    title: "Minimalist AirPods Case",
    description: "Matte silicone protective case with lanyard.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223168f?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    category: "Accessories",
  },
  {
    id: "smart-bottle",
    title: "Smart Hydration Bottle",
    description: "Tracks your water intake with app sync.",
    price: 49.0,
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1200&auto=format&fit=crop",
    badge: "New",
    category: "Lifestyle",
  },
  {
    id: "desk-lamp",
    title: "Wireless Charging Desk Lamp",
    description: "LED lamp with integrated MagSafe charger.",
    price: 89.0,
    image: "https://images.unsplash.com/photo-1545164380-9fdcf9f2184d?q=80&w=1200&auto=format&fit=crop",
    category: "Home Office",
  },
  {
    id: "travel-backpack",
    title: "Tech Travel Backpack",
    description: "Weatherproof backpack with laptop sleeve.",
    price: 129.0,
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "mechanical-keyboard",
    title: "Low-profile Mechanical Keyboard",
    description: "Silent switches, Bluetooth multi-device.",
    price: 139.0,
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "home-diffuser",
    title: "Aroma Home Diffuser",
    description: "Ultrasonic diffuser with auto shutoff.",
    price: 39.0,
    image: "https://images.unsplash.com/photo-1615631454729-3c9f96f8b976?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "phone-stand",
    title: "Aluminum Phone Stand",
    description: "Adjustable angle, cable passthrough.",
    price: 24.0,
    image: "https://images.unsplash.com/photo-1510554310709-f60c5d774fa8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "charging-pad",
    title: "Magnetic Charging Pad",
    description: "15W fast wireless charging.",
    price: 34.0,
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c17ae?q=80&w=1200&auto=format&fit=crop",
    badge: "Trending",
  },
];

export const handleProducts: RequestHandler = (_req, res) => {
  const response: ProductsResponse = { items: catalog };
  res.json(response);
};
