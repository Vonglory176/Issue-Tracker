import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import "./globals.css";
import "./theme-config.css";
import NavBar from "./NavBar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.variable}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme appearance="dark" accentColor="violet">

          <NavBar />

          <main className="p-5">{children}</main>
          <ThemePanel />

        </Theme>


      </body>
    </html>
  );
}

/*

Video --> https://youtu.be/J9sfR6HN6BY?t=2576 (42:56)
Good extra info --> https://www.youtube.com/watch?v=J9sfR6HN6BY

BUGS ---------------------------------------------------------------------------

ThunderClient 'Create Issue' API is not working for some reason. Does not seem to be related to prisma. (41:58)

IDEAS ---------------------------------------------------------------------------


TODO ---------------------------------------------------------------------------


PROBLEMS ---------------------------------------------------------------------------


*/