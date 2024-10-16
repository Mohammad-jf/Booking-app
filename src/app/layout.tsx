import Header from "@/components/layout/Header";
import "../assets/styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Booking app",
  description: "Book Your Meeting Room Right Now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
