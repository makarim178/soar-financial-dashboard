import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import Sidebar from "@Components/Sidebar";
import Topbar from "@Components/Topbar";
import { SidebarProvider } from "@Context/SidebarContext";
import { UserContextProvider } from "@Context/UserContext";
import "./globals.css";
import QueryProvider from "@/src/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Soar Financial Dashboard",
  description: "A comprehensive financial dashboard for managing accounts, transactions, and financial analytics",
  keywords: ["financial dashboard", "banking", "transactions", "finance management", "account tracking", "Next.js", "React"],
  authors: [{ name: "Soar Financial Team" }],
  creator: "Soar Financial",
  publisher: "Soar Financial",
  applicationName: "Soar Financial Dashboard",
  category: "Finance",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soar-financial.example.com",
    title: "Soar Financial Dashboard",
    description: "A comprehensive financial dashboard for managing accounts, transactions, and financial analytics",
    siteName: "Soar Financial Dashboard",
    images: [
      {
        url: "https://soar-financial.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soar Financial Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soar Financial Dashboard",
    description: "A comprehensive financial dashboard for managing accounts, transactions, and financial analytics",
    creator: "@soarfinancial",
    images: ["https://soar-financial.example.com/twitter-image.jpg"],
  },
  appleWebApp: {
    title: "Soar Financial",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  metadataBase: new URL("https://soar-financial.example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter?.className ?? ''} ${lato?.className ?? ''} antialiased`}>
        <QueryProvider>
          <UserContextProvider>
            <SidebarProvider>
              <div className="flex flex-col min-h-screen">
                <Sidebar />
                <div className="md:ml-[250px] flex-1 flex flex-col transition-all duration-300">
                  <Topbar />
                  <main className="flex-1 p-4 md:bg-main md:p-6">
                    {children}
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </UserContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
