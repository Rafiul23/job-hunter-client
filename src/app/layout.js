import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/Providers/AuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Hunter",
  description: "This page is about home page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="container mx-auto">
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
