import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thinkzaar",
  description: "Crowd-Powered Problem Solving Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">Thinkzaar</Link>
            <div className="flex gap-6 items-center">
              <Link href="/problems" className="hover:text-indigo-600">Browse</Link>
              <Link href="/login" className="hover:text-indigo-600">Login</Link>
              <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Get Started</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
