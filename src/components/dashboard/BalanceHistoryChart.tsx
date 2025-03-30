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
  Legend
} from 'chart.js';

import { BalanceHistoryData } from '@/src/types';
import DefaultLoader from '../defaultLoader/DefaultLoader';
import { getBalanceChartData, balanceChartOptions } from './charts';

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

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-title">Balance History</h3>
      <div className="bg-white min-h-[325px] rounded-3xl shadow p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <DefaultLoader />
          </div>
        ) : (
          <div className="h-[300px]">
            <Line data={getBalanceChartData(data)} options={balanceChartOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
