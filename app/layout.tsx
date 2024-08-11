import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthProvider";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quanta",
  description: "The perfect AI customer support for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={inter.className}>
        {children} 
        </body>
    </html>
    </AuthProvider>
  );
}
