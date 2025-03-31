'use client';

import { Suspense } from "react";
import { TransactionType } from "@/src/types";
import Transaction from "../transaction/Transaction";
import SectionCard from "./sectionCard/SectionCard";
import createSuspenseResource from "@/src/utils/createSuspenseResource";
import { getApiUrl } from "@/src/utils/getApiUrl";
import RecentTransactionLoader from "../loaders/RecentTransactionLoader";

// Function to fetch transactions
const fetchTransactions = async (): Promise<TransactionType[]> => {
  // Use the utility function to get the API URL
  const apiUrl = getApiUrl();
  const url = `${apiUrl}/api/transactions`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Component that uses the data
function TransactionList() {
  const transactionsResource = createSuspenseResource<TransactionType[]>(
    fetchTransactions,
    'transactions'
  ) as { read: () => TransactionType[] };

  const transactions = transactionsResource.read();

  return (
    <div className="lg:px-0 xl:px-2 py-3 space-y-4">
      {transactions.length > 0 ? (
        transactions.map((transaction: TransactionType) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))
      ) : (
        <p className="text-center py-4">No transactions found</p>
      )}
    </div>
  );
}

export default function TransactionHistory() {
  return (
    <SectionCard title="Recent Transactions">
      <Suspense fallback={
        <div className="flex items-center justify-center py-4" aria-live="polite" aria-busy="true">
          <RecentTransactionLoader />
        </div>
      }>
        <TransactionList />
      </Suspense>
    </SectionCard>
  );
}
