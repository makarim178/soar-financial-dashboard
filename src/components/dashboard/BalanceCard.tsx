interface BalanceCardProps {
  title: string;
  amount: string;
  change: string;
  positive?: boolean;
}

export default function BalanceCard({ title, amount, change, positive = true }: BalanceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{amount}</p>
      <p className={`mt-2 ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {change} {positive ? '↑' : '↓'}
      </p>
    </div>
  );
}