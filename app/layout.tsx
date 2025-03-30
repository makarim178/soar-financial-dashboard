import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import Sidebar from "@Components/Sidebar";
import Topbar from "@Components/Topbar";
import { SidebarProvider } from "@Context/SidebarContext";
import { UserContextProvider } from "@Context/UserContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Soar Financial Dashboard",
  description: "A responsive financial dashboard application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter?.className ?? ''} ${lato?.className ?? ''} antialiased`}>
        <UserContextProvider>
          <SidebarProvider>
            <div className="flex flex-col min-h-screen">
              <Sidebar />
              <div className="md:ml-[250px] flex-1 flex flex-col transition-all duration-300">
                <Topbar />
                <main className="flex-1 p-4 bg-main md:p-6">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
