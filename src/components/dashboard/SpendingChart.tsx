'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyActivityData {
  labels: string[];
  deposits: number[];
  withdrawals: number[];
}

export default function SpendingChart() {
  const [data, setData] = useState<WeeklyActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/weekly-activity');
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const weeklyData = await response.json();
        setData(weeklyData);
      } catch (error) {
        console.error('Error fetching weekly activity data:', error);
        // You could set an error state here if you want to display an error message
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
  };

  const options: ChartOptions<'bar'> = {
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

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-title">Weekly Activity</h3>
      <div className="bg-white min-h-[325px] min-w-[325px] rounded-3xl shadow p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Loading chart data...</p>
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}
