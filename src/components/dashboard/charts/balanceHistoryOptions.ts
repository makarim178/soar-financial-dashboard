import { ChartOptions } from 'chart.js';

export const balanceChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: '#fff',
      titleColor: '#232323',
      bodyColor: '#718EBF',
      borderColor: '#E7EFFF',
      borderWidth: 1,
      padding: 10,
      cornerRadius: 8,
      titleFont: {
        family: 'Inter',
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        family: 'Inter',
        size: 12,
      },
      callbacks: {
        label: function(context) {
          return `$${context.parsed.y}`;
        }
      }
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: '#F5F7FA',
        drawTicks: false,
      },
      ticks: {
        color: '#718EBF',
        font: {
          family: 'Inter',
        },
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#F5F7FA',
        drawTicks: false,
      },
      border: {
        display: false,
      },
      ticks: {
        color: '#718EBF',
        font: {
          family: 'Inter',
        },
        callback: (value) => `${value}`,
        stepSize: 200,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4, // Curved line
    },
  },
};