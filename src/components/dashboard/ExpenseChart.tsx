'use client';

import { useState, useEffect } from 'react';
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
  const [expenseData, setExpenseData] = useState<ExpenseStatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    fetchExpenseData()
      .then(data => {
        if (isMounted) {
          setExpenseData(data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, []);
  
  if (isLoading) {
    return <DefaultLoader />;
  }
  
  if (error) {
    return <div>Error loading expense data: {error.message}</div>;
  }
  
  if (!expenseData) {
    return <div>No expense data available</div>;
  }
  
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
        <ExpenseChartContent />
      </div>
    </SectionCard>
  );
};

export default ExpenseChart;
