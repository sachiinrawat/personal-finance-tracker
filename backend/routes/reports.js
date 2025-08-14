const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/reports/summary
// @desc    Get financial summary (total income, expenses, balance)
// @access  Private
router.get('/summary', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Build date filter
    const dateFilter = { user: req.user._id };
    if (startDate || endDate) {
      dateFilter.date = {};
      if (startDate) dateFilter.date.$gte = new Date(startDate);
      if (endDate) dateFilter.date.$lte = new Date(endDate);
    }

    const summary = await Transaction.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;

    summary.forEach(item => {
      if (item._id === 'income') {
        totalIncome = item.total;
      } else if (item._id === 'expense') {
        totalExpenses = item.total;
      }
    });

    const balance = totalIncome - totalExpenses;

    res.json({
      totalIncome,
      totalExpenses,
      balance,
      period: {
        startDate: startDate || null,
        endDate: endDate || null
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reports/monthly
// @desc    Get monthly report
// @access  Private
router.get('/monthly', auth, async (req, res) => {
  try {
    const { year = new Date().getFullYear(), month = new Date().getMonth() + 1 } = req.query;
    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const monthlyData = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            type: '$type',
            category: '$category'
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          categories: {
            $push: {
              category: '$_id.category',
              total: '$total',
              count: '$count'
            }
          },
          total: { $sum: '$total' }
        }
      }
    ]);

    const result = {
      month: parseInt(month),
      year: parseInt(year),
      income: { total: 0, categories: [] },
      expenses: { total: 0, categories: [] }
    };

    monthlyData.forEach(item => {
      if (item._id === 'income') {
        result.income = { total: item.total, categories: item.categories };
      } else if (item._id === 'expense') {
        result.expenses = { total: item.total, categories: item.categories };
      }
    });

    result.balance = result.income.total - result.expenses.total;

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reports/weekly
// @desc    Get weekly report
// @access  Private
router.get('/weekly', auth, async (req, res) => {
  try {
    const { date = new Date().toISOString().split('T')[0] } = req.query;
    
    const targetDate = new Date(date);
    const dayOfWeek = targetDate.getDay();
    const startDate = new Date(targetDate);
    startDate.setDate(targetDate.getDate() - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    const weeklyData = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            type: '$type',
            day: { $dayOfWeek: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          dailyTotals: {
            $push: {
              day: '$_id.day',
              total: '$total',
              count: '$count'
            }
          },
          total: { $sum: '$total' }
        }
      }
    ]);

    const result = {
      weekStart: startDate.toISOString().split('T')[0],
      weekEnd: endDate.toISOString().split('T')[0],
      income: { total: 0, dailyTotals: [] },
      expenses: { total: 0, dailyTotals: [] }
    };

    weeklyData.forEach(item => {
      if (item._id === 'income') {
        result.income = { total: item.total, dailyTotals: item.dailyTotals };
      } else if (item._id === 'expense') {
        result.expenses = { total: item.total, dailyTotals: item.dailyTotals };
      }
    });

    result.balance = result.income.total - result.expenses.total;

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reports/chart-data
// @desc    Get data for charts (monthly trends)
// @access  Private
router.get('/chart-data', auth, async (req, res) => {
  try {
    const { months = 6 } = req.query;
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - parseInt(months));

    const chartData = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            type: '$type'
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Format data for frontend charts
    const monthlyData = {};
    
    chartData.forEach(item => {
      const key = `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`;
      if (!monthlyData[key]) {
        monthlyData[key] = { income: 0, expenses: 0 };
      }
      monthlyData[key][item._id.type === 'income' ? 'income' : 'expenses'] = item.total;
    });

    const result = Object.keys(monthlyData).map(key => ({
      month: key,
      income: monthlyData[key].income,
      expenses: monthlyData[key].expenses,
      balance: monthlyData[key].income - monthlyData[key].expenses
    }));

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
