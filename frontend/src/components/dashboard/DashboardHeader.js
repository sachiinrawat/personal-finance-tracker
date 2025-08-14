import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DollarSign, Plus, LogOut, Filter, Calendar } from 'lucide-react';

const DashboardHeader = ({ user, onAddTransaction, filters, onFiltersChange }) => {
  const { logout } = useAuth();

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      type: '',
      category: '',
      startDate: '',
      endDate: ''
    });
  };

  return (
    <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Welcome */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white ml-3">FinanceTracker</h1>
            </div>
            <div className="hidden sm:block">
              <p className="text-white/80">Welcome back, {user?.name}!</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddTransaction}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Transaction
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="pb-4 border-t border-white/10 pt-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-white/60 mr-2" />
              <span className="text-sm font-medium text-white">Filters:</span>
            </div>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="text-sm bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              type="text"
              placeholder="Category"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="text-sm bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-white/60" />
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="text-sm bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <span className="text-white/60">to</span>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="text-sm bg-white/10 border border-white/20 rounded-full px-3 py-1 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {(filters.type || filters.category || filters.startDate || filters.endDate) && (
              <button
                onClick={clearFilters}
                className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
