const express = require('express');
const router = express.Router();
const task = require('../controllers/taskController');
const { body, param } = require('express-validator');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');




router.get('/', authenticate, task.getAll);

router.get('/me', authenticate, task.getMyTasks);
router.get('/filter-by-date', authenticate, task.filterByDate);
router.get('/stats', authenticate, task.getStats);



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
        body('title').optional().notEmpty(),
        body('status').optional().isIn(['pending', 'in_progress', 'completed']),
        body('priority').optional().isIn(['low', 'medium', 'high']),
    ],
    validate,
    task.update);

router.patch('/:id', authenticate,
    [
        body('title').optional().notEmpty(),
        body('status').optional().isIn(['pending', 'in_progress', 'completed']),
        body('priority').optional().isIn(['low', 'medium', 'high']),
    ],
    validate,
    task.patch
);


router.patch('/:id/status', authenticate,
    [
        body('status').isIn(['pending', 'in_progress', 'completed']).withMessage('Invalide status value'),
        
    ],
    validate,
    task.updateStatus);



router.delete('/:id', authenticate,
    [
        param('id').isUUID().withMessage('Invalid task ID'),
    ],
    validate,
    task.delete
);


module.exports = router;