const transactions = [
  { id: 1, name: 'Grocery Store', date: 'Today', amount: '-$56.20' },
  { id: 2, name: 'Salary Deposit', date: 'Yesterday', amount: '+$2,400.00' },
  { id: 3, name: 'Electric Bill', date: 'Mar 28', amount: '-$128.50' },
  { id: 4, name: 'Freelance Payment', date: 'Mar 25', amount: '+$840.00' },
];

export default function TransactionHistory() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{transaction.name}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <p className={transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}