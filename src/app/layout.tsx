import "~/styles/globals.css";
import "~/styles/custom.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar";
import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Blogx",
  description: "Web blogs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <Providers>
          <TRPCReactProvider>
            <ThemeProvider
              disableTransitionOnChange
              storageKey="theme"
              themes={["system", "light", "dark"]}
            >
              <Navbar />
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
