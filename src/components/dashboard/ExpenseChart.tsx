'use client';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DefaultLoader from '../defaultLoader/DefaultLoader';
import { 
  getExpenseChartData, 
  expenseChartOptions, 
  expenseChartPlugin 
} from './charts';
import { ExpenseStatisticsData } from '@/src/types';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const [expenseData, setExpenseData] = useState<ExpenseStatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/expense-statistics');
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setExpenseData(data);
      } catch (error) {
        console.error('Error fetching expense statistics data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-title" id="expense-chart-heading">Expense Statistics</h2>
      <div 
        className="relative bg-white min-h-[325px] min-w-[325px] rounded-3xl shadow p-6 flex items-center justify-center"
        aria-labelledby="expense-chart-heading"
        tabIndex={0}
      >
        {loading ? (
          <div className="flex items-center justify-center" aria-live="polite" aria-busy="true">
            <DefaultLoader />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
