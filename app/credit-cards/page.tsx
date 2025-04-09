import UnderConstruction from '@Components/underConstruction/UnderConstruction'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Cards | Financial",
  description: "Manage your credit cards, view balances, and track spending",
  keywords: ["credit cards", "card management", "card balance", "credit limit", "card transactions"],
  alternates: {
    canonical: "/credit-cards",
  },
  openGraph: {
    title: "Credit Cards | Financial",
    description: "Manage your credit cards, view balances, and track spending",
    url: "/credit-cards",
    type: "website",
    images: [
      {
        url: "https://financial.example.com/credit-cards-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Financial Credit Cards Page",
      },
    ],
  },
};

const CreditCardsPage = () => {
  return (
    <UnderConstruction />
  )
}

export default CreditCardsPage
