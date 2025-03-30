import { ChartOptions } from 'chart.js';

export const expenseChartOptions: ChartOptions<'pie'> = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    }
  },
  cutout: '0%',
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    animateScale: true,
    animateRotate: true,
  },
  spacing: 7.5,
  rotation: 45,
};