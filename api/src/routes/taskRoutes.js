const express = require('express');
const router = express.Router();
const task = require('../controllers/taskController');
const { body, param } = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');




router.get('/', authenticate, task.getAll);

router.post('/', authenticate, 
    [
    body('title').notEmpty().withMessage('Title is required'),
    body('status').optional().isIn(['pending', 'in_progress', 'completed']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    
    ],
    validate,
    task.create
);


router.get('/:id', authenticate,
    [
        param('id').isUUID().withMessage('Invalid task ID'),
        
    ],
    validate,
    task.getById);

router.put('/:id', authenticate,
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('status').optional().isIn(['pending', 'in_progress', 'completed']),
        body('priority').optional().isIn(['low', 'medium', 'high']),
    ],
    validate,
    task.update);

router.delete('/:id', authenticate, task.delete);


module.exports = router;