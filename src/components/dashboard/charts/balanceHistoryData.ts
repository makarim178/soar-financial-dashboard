import { ChartData, ScriptableContext } from 'chart.js';
import { BalanceHistoryData } from '@/src/types';

export const getBalanceChartData = (data: BalanceHistoryData | null): ChartData<'line'> => ({
  labels: data?.labels || [],
  datasets: [
    {
      label: 'Balance',
      data: data?.balances || [],
      borderColor: '#396AFF',
      backgroundColor: (context: ScriptableContext<'line'>) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(57, 106, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(57, 106, 255, 0.0)');
        return gradient;
      },
      borderWidth: 3,
      fill: true,
      tension: 0.4, // This makes the line curved
      pointRadius: 0,
    },
  ],
});