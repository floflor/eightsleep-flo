import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Logo from "@/public/eightsleeplogo.svg";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eight Sleep",
  description: "By Flo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="w-full fixed top-0 flex h-12 justify-center items-center bg-black pl-10 pr-10 z-40">
          <Link href={"/"}  aria-label='Home'>
            <Image priority={true} src={Logo} alt="Logo" />
          </Link>
        </nav>
        {children}
        <footer className="position relative bottom-0 h-12 w-full bg-black"></footer>
      </body>
    </html>
  );
}
