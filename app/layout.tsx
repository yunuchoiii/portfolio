import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Background from "./_components/Layout/Background";
import FullScreen from "./_components/Layout/FullScreen/FullScreen";
import Header from "./_components/Layout/Header/Header";
import Sidebar from "./_components/Layout/Sidebar.tsx/Sidebar";
import RecoilRootProvider from "./_components/Recoil/RecoilRootProvider";
import Snackbar from "./_components/Snackbar/Snackbar";
import Providers from "./_theme/Providers";
import "./animation.css";
import "./font.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seowon Choi's Portfolio",
  description: "트렌디한 프론트엔드 개발자, 최서원의 포트폴리오 입니다.",
  keywords: ["포트폴리오", "웹 개발", "최서원", "프론트엔드", "프론트엔드 포트폴리오", "프론트엔드 개발자", "최신 웹 기술", "트렌디한 웹 디자인"],
  authors: [{ name: "Seowon Choi", url: "https://seowonchoiii.vercel.app/" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://seowonchoiii.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>
          <RecoilRootProvider>
            <Background/>
            <Header/>
            <Sidebar/>
            {children}
            <FullScreen/>
            <Snackbar/>
          </RecoilRootProvider>
        </Providers>
      </body>
      <Script src="https://kit.fontawesome.com/6ae2024ce6.js" crossOrigin="anonymous"/>
    </html>
  );
}
