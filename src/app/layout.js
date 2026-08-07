import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "M Harshavardhana Raju — Web Applications & Automation",
  description:
    "Full-stack web application builds and business automation systems. React, Next.js, Node, MongoDB, Python, C++.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-void text-pure antialiased`}>
        {children}
      </body>
    </html>
  );
}
