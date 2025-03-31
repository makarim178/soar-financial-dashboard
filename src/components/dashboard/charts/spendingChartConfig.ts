import { ChartData, ChartOptions } from 'chart.js';
import { WeeklyActivityData } from '@/src/types';

export const getChartData = (data: WeeklyActivityData | null): ChartData<'bar'> => ({
  labels: data?.labels || [],
  datasets: [
    {
      label: 'Withdraw',
      data: data?.withdrawals || [],
      backgroundColor: '#232323',
      borderRadius: 12,
      borderSkipped: false,
      barPercentage: 0.5,
      categoryPercentage: 0.8,
    },
    {
      label: 'Deposit',
      data: data?.deposits || [],
      backgroundColor: '#396AFF',
      borderRadius: 12,
      borderSkipped: false,
      barPercentage: 0.5,
      categoryPercentage: 0.8,
    },
  ],
});

export const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        color: '#718EBF',
        font: {
          family: 'Inter',
        },
      },
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#343C6A',
      bodyColor: '#343C6A',
      borderColor: '#EAEAEA',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 12,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawOnChartArea: false,
      },
      ticks: {
        color: '#718EBF',
        font: {
          family: 'Inter',
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#F5F7FA',
        drawOnChartArea: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#718EBF',
        font: {
          family: 'Inter',
        },
        callback: (value) => value.toString(),
        stepSize: 100,
        maxTicksLimit: 500,
      },
    },
  },
};