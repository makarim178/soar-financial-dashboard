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
} from 'chart.js';
import DefaultLoader from '../defaultLoader/DefaultLoader';
import { getChartData, chartOptions } from './charts/spendingChartConfig';
import { WeeklyActivityData } from '@/src/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-title">Weekly Activity</h3>
      <div className="bg-white min-h-[325px] min-w-[325px] rounded-3xl shadow p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <DefaultLoader />
          </div>
        ) : (
          <Bar data={getChartData(data)} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
