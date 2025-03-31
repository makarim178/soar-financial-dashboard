import { ChartData } from 'chart.js';
import { ExpenseStatisticsData } from '@/src/types';

export const getExpenseChartData = (data: ExpenseStatisticsData | null): ChartData<'pie'> => ({
  labels: data?.labels || [],
  datasets: [
    {
      data: data?.percentages || [],
      backgroundColor: data?.colors || [],
      borderWidth: 0,
    },
  ],
});