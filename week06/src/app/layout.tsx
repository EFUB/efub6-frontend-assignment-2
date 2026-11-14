import type { Metadata } from "next";
import { Gowun_Dodum, Jua } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const gowunDodum = Gowun_Dodum({
  weight: "400",
  variable: "--font-gowun-dodum",
  subsets: ["latin"],
});

const jua = Jua({
  weight: "400",
  variable: "--font-jua",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "게시판",
  description: "Next.js + MongoDB 게시판",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ko" className={`${gowunDodum.variable} ${jua.variable}`}>
      <body className="min-h-screen bg-white font-sans text-black antialiased">
        <Header session={session} />
        <main className="mx-auto max-w-2xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
