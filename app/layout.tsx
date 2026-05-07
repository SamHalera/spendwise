import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "Spendwise",
  description: "Monitor and manage your expenses with Spendwise",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased flex flex-col justify-between`}
      >
        {!session && <Header />}

        <main className="w-full">{children}</main>
        {!session && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
