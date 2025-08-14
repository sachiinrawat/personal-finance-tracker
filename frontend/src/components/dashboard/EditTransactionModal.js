import React, { useState, useEffect } from 'react';
import { X, DollarSign, Calendar, Tag, FileText } from 'lucide-react';
import { transactionsAPI } from '../../utils/api';
import { format } from 'date-fns';

const EditTransactionModal = ({ transaction, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: transaction.type,
    amount: transaction.amount.toString(),
    category: transaction.category,
    description: transaction.description || '',
    date: format(new Date(transaction.date), 'yyyy-MM-dd')
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const commonCategories = {
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other'],
    expense: ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Travel', 'Other']
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await transactionsAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        amount: parseFloat(formData.amount)
      });
    } catch (error) {
      console.error('Error updating transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h3 className="text-lg font-semibold text-white">Edit Transaction</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-md hover:bg-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Transaction Type */}
          <div className="form-group">
            <label className="form-label">Transaction Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Income</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Expense</span>
              </label>
            </div>
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                className={`input-field pl-10 ${errors.amount ? 'border-red-500' : ''}`}
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="category"
                name="category"
                type="text"
                list="categories"
                className={`input-field pl-10 ${errors.category ? 'border-red-500' : ''}`}
                placeholder="Enter or select category"
                value={formData.category}
                onChange={handleChange}
              />
              <datalist id="categories">
                {commonCategories[formData.type].map(cat => (
                  <option key={cat} value={cat} />
                ))}
                {categories.map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="description"
                name="description"
                type="text"
                className="input-field pl-10"
                placeholder="Add a description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="date"
                name="date"
                type="date"
                className={`input-field pl-10 ${errors.date ? 'border-red-500' : ''}`}
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-white border-2 border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {loading ? 'Updating...' : 'Update Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
