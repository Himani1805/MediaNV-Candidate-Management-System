import { body, validationResult } from 'express-validator';

// Validation Rules
export const candidateValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required'),
    
    body('email')
        .isEmail().withMessage('Must be a valid email address')
        .notEmpty().withMessage('Email is required'),
    
    body('age')
        .isInt({ min: 18 }).withMessage('Age must be an integer and at least 18'),
    
    body('status')
        .optional()
        .isIn(['Applied', 'Interviewing', 'Hired', 'Rejected'])
        .withMessage('Status must be one of: Applied, Interviewing, Hired, or Rejected')
];

// Middleware to handle errors
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array().map(err => ({ field: err.path, message: err.msg })) 
        });
    }
    next();
};