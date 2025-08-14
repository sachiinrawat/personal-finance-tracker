import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { reportsAPI, transactionsAPI } from '../../utils/api';
import DashboardHeader from './DashboardHeader';
import FinancialSummary from './FinancialSummary';
import TransactionList from './TransactionList';
import AddTransactionModal from './AddTransactionModal';
import EditTransactionModal from './EditTransactionModal';
import Charts from './Charts';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch summary data
      const summaryResponse = await reportsAPI.getSummary(filters);
      setSummary(summaryResponse.data);

      // Fetch recent transactions
      const transactionsResponse = await transactionsAPI.getAll({
        ...filters,
        limit: 10,
        page: 1
      });
      setTransactions(transactionsResponse.data.transactions);

      // Fetch chart data
      const chartResponse = await reportsAPI.getChartData({ months: 6 });
      setChartData(chartResponse.data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      await transactionsAPI.create(transactionData);
      toast.success('Transaction added successfully');
      setShowAddModal(false);
      fetchDashboardData();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Failed to add transaction');
    }
  };

  const handleEditTransaction = async (id, transactionData) => {
    try {
      await transactionsAPI.update(id, transactionData);
      toast.success('Transaction updated successfully');
      setShowEditModal(false);
      setEditingTransaction(null);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Failed to update transaction');
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionsAPI.delete(id);
        toast.success('Transaction deleted successfully');
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Failed to delete transaction');
      }
    }
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>
      
      <DashboardHeader 
        user={user} 
        onAddTransaction={() => setShowAddModal(true)}
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Financial Summary */}
          <FinancialSummary summary={summary} />
          
          {/* Charts */}
          <Charts data={chartData} />
          
          {/* Recent Transactions */}
          <TransactionList 
            transactions={transactions}
            onEdit={openEditModal}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTransaction}
        />
      )}

      {showEditModal && editingTransaction && (
        <EditTransactionModal
          transaction={editingTransaction}
          onClose={() => {
            setShowEditModal(false);
            setEditingTransaction(null);
          }}
          onSubmit={(data) => handleEditTransaction(editingTransaction._id, data)}
        />
      )}
    </div>
  );
};

export default Dashboard;
