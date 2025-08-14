import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ data }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Prepare data for monthly trend chart
  const monthlyTrendData = {
    labels: data.map(item => {
      const [year, month] = item.month.split('-');
      return new Date(year, month - 1).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    }),
    datasets: [
      {
        label: 'Income',
        data: data.map(item => item.income),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
      },
      {
        label: 'Expenses',
        data: data.map(item => item.expenses),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      }
    ]
  };

  // Prepare data for balance trend line chart
  const balanceTrendData = {
    labels: data.map(item => {
      const [year, month] = item.month.split('-');
      return new Date(year, month - 1).toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    }),
    datasets: [
      {
        label: 'Balance',
        data: data.map(item => item.balance),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Calculate totals for doughnut chart
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);

  const doughnutData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y || context.parsed);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return context.label + ': ' + formatCurrency(context.parsed) + ' (' + percentage + '%)';
          }
        }
      }
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Financial Overview</h3>
        <div className="text-center py-8">
          <p className="text-white/60">No data available for charts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expenses */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Income vs Expenses</h3>
          <Bar data={monthlyTrendData} options={chartOptions} />
        </div>

        {/* Income vs Expenses Distribution */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">Income vs Expenses Distribution</h3>
          <div className="flex justify-center">
            <div style={{ width: '300px', height: '300px' }}>
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Balance Trend */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Balance Trend</h3>
        <Line data={balanceTrendData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default Charts;
