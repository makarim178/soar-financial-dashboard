import { Chart as ChartJS, ArcElement } from 'chart.js';

export const expenseChartPlugin = {
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
      const total = dataset.data.reduce((sum: number, val) => sum + (Number(val) || 0), 0);
      arc.outerRadius = total * scale;
    });
  },
  afterDraw: (chart: ChartJS) => {
    const { ctx, chartArea, data } = chart;
    if (!chartArea) return;
    
    const meta = chart.getDatasetMeta(0);
    const arcs: ArcElement[] = meta.data as ArcElement[];
    const total = data.datasets[0].data.reduce((sum: number, val) => sum + (Number(val) || 0), 0);

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