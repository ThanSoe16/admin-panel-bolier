import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../styles/globals.css";
import "@radix-ui/themes/styles.css";
import Providers from "./Provider";
import { Suspense } from "react";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "One Site Blog Super Admin",
  description: "One Site Blog Super Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/logo/logo.png"
        />
        <link
          rel="icon"
          href="/logo/logo.png"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${manrope.variable}  antialiased relative`}>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
