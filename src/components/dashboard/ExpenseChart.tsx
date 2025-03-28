'use client';

import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
  const data = [15, 35, 20, 30]; // Extract data for easier reference
  
  const customPlugin = {
    id: 'customPlugin',
    beforeDraw: (chart: ChartJS) => {
      const { chartArea, data } = chart;
      if (!chartArea) return;

      const dataset = data.datasets[0];
      const meta = chart.getDatasetMeta(0);
      const arcs: ArcElement[] = meta.data as ArcElement[];
      
      // Find max value for scaling
      const maxValue = dataset?.data?.length > 0 
        ? Math.max(...dataset.data.filter((value): value is number => typeof value === 'number')) 
        : 0;
      
      arcs.forEach((arc: ArcElement, i: number) => {
        const value = dataset.data[i];
        const scale = 1.35 - ((Number(value) ?? 0) / (Number(maxValue) || 1)) * 0.25;
        arc.outerRadius = chart.getDatasetMeta(0)?.total * scale;
      });
    },
    afterDraw: (chart: ChartJS) => {
      const { ctx, chartArea, data } = chart;
      if (!chartArea) return;
      
      const meta = chart.getDatasetMeta(0);
      const arcs: ArcElement[] = meta.data as ArcElement[];
      const total = meta?.total;

      arcs.forEach((arc: ArcElement, i:number) => {
        const value = Number(data.datasets[0]?.data[i] ?? 0);
        const percentage = Math.round((value / total) * 100);
        const label = String(data?.labels?.[i] ?? '');
        
        const angle = arc.startAngle + (arc.endAngle - arc.startAngle) / 2;
        const radius = arc.outerRadius * 0.6; // Position at 60% of the radius        
        const x = arc.x + Math.cos(angle) * radius;
        const y = arc.y + Math.sin(angle) * radius;
        
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 16px Inter';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(`${percentage}%`, x, y - 5);
        
        ctx.font = '16px Inter';
        ctx.fillText(label, x, y + 12);
        ctx.restore();
      });
    }
  };

  const [expenseData] = useState({
    labels: ['Bill Expense', 'Others', 'Investment', 'Entertainment'],
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#FC7900', // Bill Expense - orange
          '#232323', // Others - black
          '#396AFF', // Investment - medium blue
          '#343C6A', // Entertainment - dark blue
        ],
        borderWidth: 0,
      },
    ],
  });

  const options = {
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-title">Expense Statistics</h2>
      <div className="relative bg-white min-h-[325px] min-w-[325px] rounded-3xl shadow p-6 flex items-center justify-center">
        <div className="w-[280px] h-[280px]">
          <Pie 
            data={expenseData} 
            options={options} 
            plugins={[customPlugin]} 
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
