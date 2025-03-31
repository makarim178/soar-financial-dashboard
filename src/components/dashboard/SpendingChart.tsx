'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DefaultLoader from '../defaultLoader/DefaultLoader';
import { getChartData as getSpendingChartData, chartOptions } from './charts';
import { WeeklyActivityData } from '@/src/types';
import SectionCard from './sectionCard/SectionCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingChart = () => {
  const [spendingData, setSpendingData] = useState<WeeklyActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/weekly-activity');
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setSpendingData(data);
      } catch (error) {
        console.error('Error fetching spending data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SectionCard title="Spending Statistics">
      {loading ? (
          <div className="flex items-center justify-center" aria-live="polite" aria-busy="true">
            <DefaultLoader />
          </div>
        ) : (
          <div 
            className="w-full h-[280px]"
            aria-label="Bar chart showing monthly spending statistics"
            role="img"
          >
            <Bar 
              data={getSpendingChartData(spendingData)} 
              options={chartOptions} 
            />
          </div>
        )}
    </SectionCard>
    // <div>
    //   <h2 className="text-xl font-semibold mb-4 text-title" id="spending-chart-heading">Spending Statistics</h2>
    //   <div 
    //     className="relative bg-white min-h-[325px] rounded-3xl shadow p-6 flex items-center justify-center"
    //     aria-labelledby="spending-chart-heading"
    //     tabIndex={0}
    //   >
    //     {loading ? (
    //       <div className="flex items-center justify-center" aria-live="polite" aria-busy="true">
    //         <DefaultLoader />
    //       </div>
    //     ) : (
    //       <div 
    //         className="w-full h-[280px]"
    //         aria-label="Bar chart showing monthly spending statistics"
    //         role="img"
    //       >
    //         <Bar 
    //           data={getSpendingChartData(spendingData)} 
    //           options={chartOptions} 
    //         />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default SpendingChart;
