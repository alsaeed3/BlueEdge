'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface InvestmentChartProps {
  propertyName?: string;
  initialInvestment?: number;
  annualReturn?: number;
  years?: number;
  additionalInfo?: {
    locationGrowth?: number;
    rentalYield?: number;
    propertyType?: string;
  };
}

export default function InvestmentChart({
  propertyName = "Dubai Downtown Property",
  initialInvestment = 500000,
  annualReturn = 7.5,
  years = 10,
  additionalInfo = {
    locationGrowth: 9.2,
    rentalYield: 5.8,
    propertyType: "Apartment"
  }
}: InvestmentChartProps) {
  // Generate years array for x-axis
  const yearsArray = Array.from({ length: years + 1 }, (_, i) => `Year ${i}`);
  
  // Calculate cumulative returns for line chart
  const cumulativeReturns = [initialInvestment];
  for (let i = 1; i <= years; i++) {
    const previousValue = cumulativeReturns[i - 1];
    const newValue = previousValue * (1 + annualReturn / 100);
    cumulativeReturns.push(Number(newValue.toFixed(2)));
  }
  
  // Line chart data
  const lineChartData = {
    labels: yearsArray,
    datasets: [
      {
        label: 'Property Value Projection',
        data: cumulativeReturns,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        fill: false,
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(255, 255, 255)',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: function(context: any) {
            return `Value: $${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  return (
    <div className="w-full h-[350px] mx-auto">
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
}