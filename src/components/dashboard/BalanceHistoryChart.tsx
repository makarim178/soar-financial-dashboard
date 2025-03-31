'use client';

import { Suspense } from 'react';
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
import createSuspenseResource from '@/src/utils/createSuspenseResource';

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

// Function to fetch balance history data
const fetchBalanceHistory = async (): Promise<BalanceHistoryData> => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/balance-history`);
  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

// Component that uses the data
function BalanceHistoryContent() {
  const balanceResource = createSuspenseResource<BalanceHistoryData>(
    fetchBalanceHistory,
    'balanceHistoryData'
  ) as { read: () => BalanceHistoryData };
  
  const data = balanceResource.read();
  
  return (
    <div
      className="h-[230px]"
      aria-label="Line chart showing balance history over time"
      role="img"
    >
      <Line
        data={getBalanceChartData(data)}
        options={balanceChartOptions}
      />
    </div>
  );
}

export default function BalanceHistoryChart() {
  return (
    <SectionCard title="Balance History">
      <Suspense fallback={
        <div className="h-[275px] flex items-center justify-center" aria-live="polite" aria-busy="true">
          <DefaultLoader />
        </div>
      }>
        <BalanceHistoryContent />
      </Suspense>
    </SectionCard>
  );
}
