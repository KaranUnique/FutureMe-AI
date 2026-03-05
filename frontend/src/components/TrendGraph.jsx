import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrendGraph = ({ showImproved, data }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });

  const currentStability = data.currentPath.scores.overallStability;
  const labels = ['Current', 'Year 1', 'Year 2', 'Year 3'];
  
  // Create rough linear projections
  const currentTrend = [
    currentStability,
    Math.max(0, currentStability - 5),
    Math.max(0, currentStability - 12),
    Math.max(0, currentStability - 20)
  ];

  const improvedStability = data.improvedPath.scores.overallStability;
  const improvedTrend = [
    currentStability,
    improvedStability - 10,
    improvedStability - 4,
    improvedStability
  ];

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.canvas.getContext('2d');
    
    // Create rich gradients for the fill areas (bars vertical fill)
    const currentGradient = ctx.createLinearGradient(0, 0, 0, 400);
    currentGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)'); // Blue solid top
    currentGradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)'); // Blue fade bottom

    const improvedGradient = ctx.createLinearGradient(0, 0, 0, 400);
    improvedGradient.addColorStop(0, 'rgba(16, 185, 129, 0.9)'); // Emerald solid top
    improvedGradient.addColorStop(1, 'rgba(16, 185, 129, 0.2)'); // Emerald fade bottom

    setChartData({
      labels,
      datasets: [
        {
          label: 'Current Path',
          data: currentTrend,
          backgroundColor: currentGradient,
          borderColor: '#3b82f6', // blue-500
          borderWidth: { top: 2, right: 1, bottom: 0, left: 1 },
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
        showImproved ? {
          label: 'Improved Habits',
          data: improvedTrend,
          backgroundColor: improvedGradient,
          borderColor: '#10b981', // emerald-500
          borderWidth: { top: 2, right: 1, bottom: 0, left: 1 },
          borderRadius: 8,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        } : null
      ].filter(Boolean)
    });
  }, [showImproved, data]); // Re-run when data or toggle changes

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Let it fill the parent div
    layout: {
      padding: {
        top: 20,
        bottom: 10
      }
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { 
          color: '#9ca3af', 
          usePointStyle: true, 
          boxWidth: 10,
          font: {
            family: "'Inter', sans-serif",
            weight: 'bold',
            size: 13
          },
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(11, 15, 26, 0.9)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(55, 65, 81, 0.8)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        boxPadding: 4,
        usePointStyle: true
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        grid: { 
          color: 'rgba(31, 41, 55, 0.4)', // Very subtle gray lines
          drawBorder: false,
        },
        ticks: { 
          color: '#6b7280',
          font: {
            family: "'Inter', sans-serif",
            size: 10
          },
          padding: 6
        }
      },
      x: {
        grid: { 
          display: false,
          drawBorder: false,
        },
        ticks: { 
          color: '#9ca3af',
          font: {
            family: "'Inter', sans-serif",
            weight: '500',
            size: 12
          },
          padding: 10
        }
      }
    },
    interaction: {
      mode: 'index',
      axis: 'x',
      intersect: false
    }
  };

  return (
    // Reduce height to remove empty space visually and fit within visible area
    <div className="h-48 sm:h-56 w-full relative">
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default TrendGraph;
