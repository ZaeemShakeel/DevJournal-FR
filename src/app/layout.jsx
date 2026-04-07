import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevJournal — Write, Share, Inspire",
  description: "A modern blog platform for developers to share their journey, tutorials, and insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeContext>
          <AuthProvider>
            <Toaster position="top-center" />
            <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
              <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeContext>
      </body>
    </html>
  );
}
