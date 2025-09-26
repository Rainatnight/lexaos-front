import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import MainComponent from "@/components/MainComponent/MainComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const background = useSelector((state: RootState) => state.theme.background);

  return (
    <>
      <Head>
        <title>Lexa OS</title>
        <meta name="description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/favicon32x.png" sizes="32x32" />
        <link rel="icon" href="/img/favicon16x.png" sizes="16x16" />
      </Head>
      <div
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          backgroundColor: background,
        }}
      >
        <main>
          <MainComponent />
        </main>
      </div>
    </>
  );
}
