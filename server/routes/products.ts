import { RequestHandler } from "express";
import type { ProductsResponse, Product } from "@shared/api";

// Demo catalog; replace with real provider/DB as needed
const catalog: Product[] = [
  {
    id: "airpods-case",
    title: "Minimalist AirPods Case",
    description: "Matte silicone protective case with lanyard.",
    price: 19.99,
    image: "/placeholder.svg",
    badge: "Bestseller",
    category: "Accessories",
  },
  {
    id: "smart-bottle",
    title: "Smart Hydration Bottle",
    description: "Tracks your water intake with app sync.",
    price: 49.0,
    image: "/placeholder.svg",
    badge: "New",
    category: "Lifestyle",
  },
  {
    id: "desk-lamp",
    title: "Wireless Charging Desk Lamp",
    description: "LED lamp with integrated MagSafe charger.",
    price: 89.0,
    image: "/placeholder.svg",
    category: "Home Office",
  },
  {
    id: "travel-backpack",
    title: "Tech Travel Backpack",
    description: "Weatherproof backpack with laptop sleeve.",
    price: 129.0,
    image: "/placeholder.svg",
  },
  {
    id: "mechanical-keyboard",
    title: "Low-profile Mechanical Keyboard",
    description: "Silent switches, Bluetooth multi-device.",
    price: 139.0,
    image: "/placeholder.svg",
  },
  {
    id: "home-diffuser",
    title: "Aroma Home Diffuser",
    description: "Ultrasonic diffuser with auto shutoff.",
    price: 39.0,
    image: "/placeholder.svg",
  },
  {
    id: "phone-stand",
    title: "Aluminum Phone Stand",
    description: "Adjustable angle, cable passthrough.",
    price: 24.0,
    image: "/placeholder.svg",
  },
  {
    id: "charging-pad",
    title: "Magnetic Charging Pad",
    description: "15W fast wireless charging.",
    price: 34.0,
    image: "/placeholder.svg",
    badge: "Trending",
  },
];

export const handleProducts: RequestHandler = (_req, res) => {
  const response: ProductsResponse = { items: catalog };
  res.json(response);
};
