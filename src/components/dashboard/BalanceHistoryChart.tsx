'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface BalanceHistoryData {
  labels: string[];
  balances: number[];
}

export default function BalanceHistoryChart() {
  const [data, setData] = useState<BalanceHistoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/balance-history');
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const historyData = await response.json();
        setData(historyData);
      } catch (error) {
        console.error('Error fetching balance history data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data?.labels || [],
    datasets: [
      {
        label: 'Balance',
        data: data?.balances || [],
        borderColor: '#396AFF',
        backgroundColor: (context) => {
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
  };

  const options: ChartOptions<'line'> = {
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
          drawBorder: false,
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
          drawBorder: false,
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

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-title">Balance History</h3>
      <div className="bg-white min-h-[325px] rounded-3xl shadow p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        ) : (
          <div className="h-[300px]">
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  );
}