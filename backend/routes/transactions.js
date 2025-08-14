const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/transactions
// @desc    Get all transactions for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, startDate, endDate } = req.query;
    
    // Build filter object
    const filter = { user: req.user._id };
    
    if (type && ['income', 'expense'].includes(type)) {
      filter.type = type;
    }
    
    if (category) {
      filter.category = new RegExp(category, 'i');
    }
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(filter);

    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/transactions
// @desc    Create a transaction
// @access  Private
router.post('/', [
  auth,
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('amount').isNumeric().isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('category').trim().isLength({ min: 1 }).withMessage('Category is required'),
  body('description').optional().trim(),
  body('date').optional().isISO8601().withMessage('Date must be valid')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, amount, category, description, date } = req.body;

    const transaction = new Transaction({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      date: date ? new Date(date) : new Date()
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Private
router.put('/:id', [
  auth,
  body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('amount').optional().isNumeric().isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('category').optional().trim().isLength({ min: 1 }).withMessage('Category cannot be empty'),
  body('description').optional().trim(),
  body('date').optional().isISO8601().withMessage('Date must be valid')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const { type, amount, category, description, date } = req.body;

    if (type) transaction.type = type;
    if (amount) transaction.amount = amount;
    if (category) transaction.category = category;
    if (description !== undefined) transaction.description = description;
    if (date) transaction.date = new Date(date);

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/transactions/categories
// @desc    Get all categories for user
// @access  Private
router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await Transaction.distinct('category', { user: req.user._id });
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
