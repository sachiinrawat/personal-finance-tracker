import React from 'react';
import { Edit, Trash2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">No transactions found</p>
          <p className="text-sm text-white/40 mt-2">Add your first transaction to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        <span className="text-sm text-white/60">{transactions.length} transactions</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-white/80 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {transaction.type === 'income' ? (
                      <div className="flex items-center text-green-400">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Income</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-400">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Expense</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {transaction.description || 'No description'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/60">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-yellow-400 hover:text-yellow-300 p-1 rounded-md hover:bg-white/10 transition-all"
                      title="Edit transaction"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(transaction._id)}
                      className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-white/10 transition-all"
                      title="Delete transaction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
