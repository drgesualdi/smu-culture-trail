import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: "The Culture Trail | SMU",
    description:
      "A seven-stop SMU campus scavenger hunt exploring school culture through stories, symbols, routines, and traditions.",
    openGraph: {
      title: "The Culture Trail",
      description: "7 stops · 7 lenses · one Hilltop",
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "The Culture Trail illustrated campus route" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "The Culture Trail",
      description: "7 stops · 7 lenses · one Hilltop",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
