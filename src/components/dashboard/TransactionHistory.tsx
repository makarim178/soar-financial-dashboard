import { TransactionType } from "@/src/types";
import Transaction from "../transaction/Transaction";
import SectionCard from "./sectionCard/SectionCard";

export default function TransactionHistory({ transactions }: { transactions: TransactionType[]}) {
  return (
    <SectionCard title="Recent Transactions">
      <div className="lg:px-0 xl:px-2 py-3 space-y-4">
        {transactions.map((transaction: TransactionType) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </div>
    </SectionCard>
  );
}
