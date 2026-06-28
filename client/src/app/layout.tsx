import type { Metadata } from "next";
import { Outfit, League_Spartan } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdul Hanan | Full Stack AI Developer & Engineer",
  description: "Portfolio of Abdul Hanan, UET CS '27. Specializing in MERN Stack, NestJS, Generative AI (LLMs, RAG, Agentic Frameworks), and building production-ready AI applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${leagueSpartan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
