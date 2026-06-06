import { Router } from 'express';
import { body, param } from 'express-validator';
import { getExpenses, addExpense, getExpense, editExpense, removeExpense } from '../controllers/expense.controller';
import { validate } from '../middleware/validate.middleware';
import { protect } from '../middleware/auth.middleware';
import { EXPENSE_CATEGORIES } from '../models/Expense.model';

const router = Router();

router.use(protect);

const expenseBodyRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('category').isIn(EXPENSE_CATEGORIES).withMessage('Invalid category'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('description').optional().isLength({ max: 500 }),
];

const idRule = [param('id').isMongoId().withMessage('Invalid expense ID')];

router.get('/', getExpenses);
router.post('/', expenseBodyRules, validate, addExpense);
router.get('/:id', idRule, validate, getExpense);
router.put('/:id', [...idRule, ...expenseBodyRules], validate, editExpense);
router.delete('/:id', idRule, validate, removeExpense);

export default router;
