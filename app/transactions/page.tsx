import UnderConstruction from "@Components/underConstruction/UnderConstruction"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions | Soar Financial",
  description: "View and manage all your financial transactions in one place",
  keywords: ["transactions", "financial transactions", "payment history", "transaction management"],
  alternates: {
    canonical: "/transactions",
  },
  openGraph: {
    title: "Transactions | Soar Financial",
    description: "View and manage all your financial transactions in one place",
    url: "/transactions",
    type: "website",
    images: [
      {
        url: "https://soar-financial.example.com/transactions-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Soar Financial Transactions Page",
      },
    ],
  },
};

const TransactionPage = () => {
  return (
    <UnderConstruction />
  )
}

export default TransactionPage
