import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signals In Motion",
  description: "A static-export-ready scrollytelling project scaffolded for data-driven storytelling.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
