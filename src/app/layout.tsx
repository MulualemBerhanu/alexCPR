import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlexCPR - Professional CPR & First Aid Training",
  description: "Get certified in CPR and First Aid with professional training in Clackamas, OR. Join our hands-on classes and gain the confidence to save lives.",
  keywords: "CPR training, First Aid certification, Clackamas, OR, CPR classes, First Aid training, Adult CPR, Child CPR, Infant CPR",
  authors: [{ name: "AlexCPR" }],
  openGraph: {
    title: "AlexCPR - Professional CPR & First Aid Training",
    description: "Get certified in CPR and First Aid with professional training in Clackamas, OR.",
    type: "website",
    locale: "en_US",
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
        <link rel="icon" type="image/svg+xml" href="/favIcon.svg" />
      </head>
      <body className={`${geist.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
