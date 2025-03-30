import { TransactionType } from "@/src/types";
import Transaction from "../transaction/Transaction";

export default function TransactionHistory({ transactions }: { transactions: TransactionType[]}) {
  return (
    <div className="min-h[326px]">
      <h3 className="text-xl font-semibold mb-4 text-title">Recent Transactions</h3>
      <div className="bg-white min-h-[235px] min-w-[325px] rounded-3xl shadow p-6" tabIndex={0} role="region" aria-label="Recent transactions list">
        <div className="space-y-4">
          {transactions.map((transaction: TransactionType) => (
            <Transaction transaction={transaction} key={transaction.id} />
          ))}
        </div>        
      </div>
    </div>
  );
}
