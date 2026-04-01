const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authenticate');

router.get('/', authenticate, dashboard.getDashboard);


module.exports = router;