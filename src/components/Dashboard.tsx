import BalanceCard from './dashboard/BalanceCard';
import TransactionHistory from './dashboard/TransactionHistory';
import SpendingChart from './dashboard/SpendingChart';

export default function Dashboard() {
  return (
    <>
      <div className="bg-white w-full p-6 md:ml-6">
        <h1 className="text-2xl text-[#343C6A] font-bold">Overview</h1>
      </div>
      
      <div className='m-6 space-y-6'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BalanceCard title="Total Balance" amount="$12,560.00" change="+2.3%" />
          <BalanceCard title="Income" amount="$5,240.00" change="+4.5%" positive />
          <BalanceCard title="Expenses" amount="$3,680.00" change="-1.2%" positive={false} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <div>
            <TransactionHistory />
          </div>
        </div>
      </div>
    </>
  );
}