import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Background from "./_components/Layout/Background";
import Header from "./_components/Layout/Header/Header";
import Providers from "./_theme/Providers";
import "./font.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seowon Choi's Portfolio",
  description: "최서원의 포트폴리오 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Background/>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
