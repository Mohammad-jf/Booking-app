import Header from "@/components/layout/Header";
import "../assets/styles/globals.css";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Booking app",
  description: "Book Your Meeting Room Right Now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
