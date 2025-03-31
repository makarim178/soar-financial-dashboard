'use client';

import { Suspense } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DefaultLoader from '../defaultLoader/DefaultLoader';
import {
  getExpenseChartData,
  expenseChartOptions,
  expenseChartPlugin
} from './charts';
import { ExpenseStatisticsData } from '@/src/types';
import SectionCard from './sectionCard/SectionCard';
import { getApiUrl } from '@/src/utils/getApiUrl';
import createSuspenseResource from '@/src/utils/createSuspenseResource';

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to fetch expense data
const fetchExpenseData = async (): Promise<ExpenseStatisticsData> => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/expense-statistics`);
  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

// Component that uses the data
function ExpenseChartContent() {
  const expenseResource = createSuspenseResource<ExpenseStatisticsData>(
    fetchExpenseData,
    'expenseChartData'
  ) as { read: () => ExpenseStatisticsData };
  
  const expenseData = expenseResource.read();
  
  return (
    <div
      className="w-[280px] h-[280px]"
      aria-label="Pie chart showing expense statistics breakdown"
      role="img"
    >
      <Pie
        data={getExpenseChartData(expenseData)}
        options={expenseChartOptions}
        plugins={[expenseChartPlugin]}
      />
    </div>
  );
}

const ExpenseChart = () => {
  return (
    <SectionCard title="Expense Statistics">
      <div className="flex items-center justify-center">
        <Suspense fallback={
          <div className='h-[325px]' aria-live="polite" aria-busy="true">
            <DefaultLoader />
          </div>
        }>
          <ExpenseChartContent />
        </Suspense>
      </div>
    </SectionCard>
  );
};

export default ExpenseChart;
