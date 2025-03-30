import TransactionHistory from './dashboard/TransactionHistory';
import SpendingChart from './dashboard/SpendingChart';
import MyCards from './cards/MyCards';
import ExpenseChart from './dashboard/ExpenseChart';
import BalanceHistoryChart from './dashboard/BalanceHistoryChart';
import QuickTransfer from './dashboard/QuickTransfer';
import { Suspense } from 'react';
import DefaultLoader from './defaultLoader/DefaultLoader';
import { QuickTransferProvider } from '../context/QuickTransferContext';
import { TransactionType } from '../types';

export default function Dashboard() {
  const transactions: TransactionType[] = [
    { 
      id: '5289e3d6-2b45-4f14-a2e1-ce9f16f2f568',
      description: 'Deposit from my Card',
      date: '28 January 2021', 
      amount: -850,
      currency: 'USD', 
      source: 'card' 
    },
    { 
      id: '70a3e2dc-fe97-44fd-87db-7ac3b5c45541', 
      description: 'Deposit Paypal', 
      date: '25 January 2021', 
      amount: 2500, 
      currency: 'USD', 
      source: 'paypal' 
    },
    { 
      id: 'b6470da3-9193-40a6-b4d2-7ac6f8c9cad5', 
      description: 'Jemi Wilson', 
      date: '21 January 2021',
      amount: 5400, 
      currency: 'CAD',
      source: 'money' 
    },
  ];
  return (
    <main aria-label="Financial Dashboard" className='m-6 space-y-6'>
      <h1 className="sr-only">Financial Dashboard</h1>
      
      <section aria-labelledby="cards-and-transactions-heading">
        <h2 id="cards-and-transactions-heading" className="sr-only">Cards and Recent Transactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MyCards />
          <TransactionHistory transactions={transactions} />
        </div>
      </section>
      
      <section aria-labelledby="charts-heading">
        <h2 id="charts-heading" className="sr-only">Financial Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <div>
            <ExpenseChart />
          </div>
        </div>
      </section>
      
      <section aria-labelledby="transfers-and-balance-heading">
        <h2 id="transfers-and-balance-heading" className="sr-only">Transfers and Balance History</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          <div className="md:col-span-1 lg:col-span-5">
            <Suspense fallback={
              <div aria-live="polite" aria-busy="true">
                <DefaultLoader />
              </div>
            }>
              <QuickTransferProvider>
                <QuickTransfer />
              </QuickTransferProvider>
            </Suspense>
          </div>
          <div className="md:col-span-2 lg:col-span-7">
            <BalanceHistoryChart />
          </div>
        </div>
      </section>
    </main>
  );
}
