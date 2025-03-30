import Image from "next/image";
import { transactionSourceColors } from "@Constants/transactions";
import { formatColors, formatCurrency } from "@Utils/helper";
import { TransactionType } from "@/src/types";

const Transaction = ( { transaction }: { transaction: TransactionType} ) => {
    const  {id, source, description, date, amount, currency} = transaction;
  return (
    <div
        key={id} 
        className="flex items-center justify-between"
        tabIndex={0}
        >
        <div className="flex space-x-4">
        <div
            className={`w-10 h-10 ${transactionSourceColors[source as keyof typeof transactionSourceColors]?.background ?? ''} rounded-full justify-center items-center cursor-pointer md:flex hidden`}
            aria-hidden="true"
        >
            <Image
            src={transactionSourceColors[source as keyof typeof transactionSourceColors]?.icon ?? ''} 
            width={20} height={20} 
            alt={`${source}-icon`} 
            />
        </div>
        <div>
            <p className="font-medium text-soar-dark">{description}</p>
            <p className="text-sm text-trans-date">{date}</p>
        </div>
        </div>
        <p className={formatColors(amount)}>
        {formatCurrency(amount, currency)}
        </p>
        </div>
  )
}

export default Transaction
