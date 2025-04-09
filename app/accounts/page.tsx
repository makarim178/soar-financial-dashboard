import UnderConstruction from "@Components/underConstruction/UnderConstruction"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts | Financial",
  description: "Manage your bank accounts, view balances, and track account activity",
  keywords: ["bank accounts", "account management", "account balance", "savings account", "checking account"],
  alternates: {
    canonical: "/accounts",
  },
  openGraph: {
    title: "Accounts | Financial",
    description: "Manage your bank accounts, view balances, and track account activity",
    url: "/accounts",
    type: "website",
    images: [
      {
        url: "https://financial.example.com/accounts-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Financial Accounts Page",
      },
    ],
  },
};

const AccountsPage = () => {
  return (
    <UnderConstruction />
  )
}

export default AccountsPage
