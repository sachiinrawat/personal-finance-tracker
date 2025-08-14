import React from 'react';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';

const FinancialSummary = ({ summary }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Income',
      amount: summary.totalIncome,
      icon: <TrendingUp className="h-8 w-8 text-success-600" />,
      bgColor: 'bg-success-50',
      textColor: 'text-success-600',
      change: '+12.5%'
    },
    {
      title: 'Total Expenses',
      amount: summary.totalExpenses,
      icon: <TrendingDown className="h-8 w-8 text-danger-600" />,
      bgColor: 'bg-danger-50',
      textColor: 'text-danger-600',
      change: '+8.2%'
    },
    {
      title: 'Current Balance',
      amount: summary.balance,
      icon: <Wallet className="h-8 w-8 text-primary-600" />,
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600',
      change: summary.balance >= 0 ? '+4.3%' : '-2.1%'
    }
  ];

  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80 mb-1">
                {card.title}
              </p>
              <p className={`text-3xl font-bold text-white`}>
                {formatCurrency(card.amount)}
              </p>
              <p className="text-sm text-white/60 mt-2">
                <span className={`${card.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {card.change}
                </span>
                {' '}from last month
              </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
              {React.cloneElement(card.icon, { className: "h-8 w-8 text-white" })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummary;
