'use client';

import { useState, useEffect } from 'react';
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
import SectionCard from './sectionCard/SectionCard';
import { getApiUrl } from '@/src/utils/getApiUrl';

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
  const [balanceData, setBalanceData] = useState<BalanceHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const apiUrl = getApiUrl();
    
    fetch(`${apiUrl}/api/balance-history`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          setBalanceData(data);
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

  return (
    <SectionCard title="Balance History">
      <div className="h-[230px]">
        {isLoading ? (
          <div className="h-full flex items-center justify-center" aria-live="polite" aria-busy="true">
            <DefaultLoader />
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-red-500">
            Error loading balance data: {error.message}
          </div>
        ) : balanceData ? (
          <div
            aria-label="Line chart showing balance history over time"
            role="img"
          >
            <Line
              data={getBalanceChartData(balanceData)}
              options={balanceChartOptions}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            No balance data available
          </div>
        )}
      </div>
    </SectionCard>
  );
}
