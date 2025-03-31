import TransactionHistory from './dashboard/TransactionHistory';
import SpendingChart from './dashboard/SpendingChart';
import MyCards from './cards/MyCards';
import ExpenseChart from './dashboard/ExpenseChart';
import BalanceHistoryChart from './dashboard/BalanceHistoryChart';
import QuickTransfer from './dashboard/QuickTransfer';
import { QuickTransferProvider } from '../context/QuickTransferContext';

export default function Dashboard() {
  return (
    <main aria-label="Financial Dashboard" className='m-6 space-y-6'>
      <h1 className="sr-only">Financial Dashboard</h1>
      
      <section aria-labelledby="cards-and-transactions-heading">
        <h2 id="cards-and-transactions-heading" className="sr-only">Cards and Recent Transactions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6">
          <div className='lg:col-span-7'>
            <MyCards />
          </div>
          <div className='lg:col-span-5'>
            <TransactionHistory />
          </div>
        </div>
      </section>
      
      <section aria-labelledby="charts-heading">
        <h2 id="charts-heading" className="sr-only">Financial Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <SpendingChart />
          </div>
          <div className="lg:col-span-5">
            <ExpenseChart />
          </div>
        </div>
      </section>
      
      <section aria-labelledby="transfers-and-balance-heading">
        <h2 id="transfers-and-balance-heading" className="sr-only">Transfers and Balance History</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <QuickTransferProvider>
                <QuickTransfer />
            </QuickTransferProvider>
          </div>
          <div className="lg:col-span-7">
            <BalanceHistoryChart />
          </div>
        </div>
      </section>
    </main>
  );
}
