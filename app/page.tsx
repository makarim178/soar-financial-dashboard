import Dashboard from "@Components/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Soar Financial",
  description: "View your financial overview, recent transactions, account balances, and spending analytics",
  keywords: ["dashboard", "financial overview", "transactions", "account balance", "spending analytics"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dashboard | Soar Financial",
    description: "View your financial overview, recent transactions, account balances, and spending analytics",
    url: "/",
    type: "website",
    images: [
      {
        url: "https://soar-financial.example.com/dashboard-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Soar Financial Dashboard Overview",
      },
    ],
  },
};

export default function Home() {
  return <Dashboard />;
}
