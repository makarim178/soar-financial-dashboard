import { TransactionType } from "@/src/types";
import { transactionSourceColors } from "@Constants/transactions";
import { formatColors, formatCurrency } from "@Utils/helper";
import Image from "next/image";

export default function TransactionHistory({ transactions }: { transactions: TransactionType[]}) {
  return (
    <div className="min-h[326px]">
      <h3 className="text-xl font-semibold mb-4 text-title">Recent Transactions</h3>
      <div className="bg-white min-h-[235px] min-w-[325px] rounded-3xl shadow p-6">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id} 
              className="flex items-center justify-between"
            >
              <div className="flex space-x-4">
                <div
                  className={`w-10 h-10 ${transactionSourceColors[transaction.source as keyof typeof transactionSourceColors]?.background ?? ''} rounded-full justify-center items-center cursor-pointer md:flex hidden`}
                >
                  <Image
                    src={transactionSourceColors[transaction.source as keyof typeof transactionSourceColors]?.icon ?? ''} 
                    width={20} height={20} 
                    alt={`${transaction.source}-icon`} 
                  />
                </div>
                <div>
                  <p className="font-medium text-soar-dark">{transaction.description}</p>
                  <p className="text-sm text-trans-date">{transaction.date}</p>
                </div>
              </div>
              <p className={formatColors(transaction.amount)}>
                {formatCurrency( transaction.amount, transaction.currency)}
              </p>
            </div>
          ))}
        </div>        
      </div>
    </div>
  );
}