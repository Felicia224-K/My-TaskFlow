const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/', projectController.create);
router.get('/', projectController.getAll);
router.get('/search', projectController.search);
router.get('/:id', projectController.getOne);
router.put('/:id', projectController.update);
router.get('/:id', projectController.getById);
router.delete('/:id', projectController .deleteProject);
router.get('/filter-by-date', projectController.filterByDate);
module.exports = router;