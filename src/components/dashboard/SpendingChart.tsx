'use client';

import { Suspense } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DefaultLoader from '../defaultLoader/DefaultLoader';
import { getChartData as getSpendingChartData, chartOptions } from './charts';
import { WeeklyActivityData } from '@/src/types';
import SectionCard from './sectionCard/SectionCard';
import { getApiUrl } from '@/src/utils/getApiUrl';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to fetch spending data
const fetchSpendingData = async (): Promise<WeeklyActivityData> => {
  const apiUrl = getApiUrl();
  const response = await fetch(`${apiUrl}/api/weekly-activity`);
  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

// Component that uses the data
function SpendingChartContent() {
  const { data: spendingData } = useQuery({
    queryKey: ['spendingChartData'],
    queryFn: fetchSpendingData,
  });

  return (
    <div
      className="w-full h-[280px]"
      aria-label="Bar chart showing monthly spending statistics"
      role="img"
    >
      <Bar
        data={getSpendingChartData(spendingData!)}
        options={chartOptions}
      />
    </div>
  );
}

const SpendingChart = () => {
  return (
    <SectionCard title="Spending Statistics">
      <Suspense fallback={
        <div className="flex h-[325px] items-center justify-center" aria-live="polite" aria-busy="true">
          <DefaultLoader />
        </div>
      }>
        <SpendingChartContent />
      </Suspense>
    </SectionCard>
  );
};

export default SpendingChart;
