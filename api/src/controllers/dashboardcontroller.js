const { Task, Project } = require('../models');
const redis = require('../config/redis');

exports.getDashboard = async (req, res) => {
    try {
        const cacheKey = `dashboard:${req.user.id}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.json({
                    fromCache: true,
                    data: JSON.parse(cached)
                });
        }
           
       const totalProjects = await Project.count({
            where: { userId: req.user.id } 
        });
       const totalTasks = await Task.count({ 
            where: { userId: req.user.id } 
        });

        const completedTasks = await Task.count({
            where: { 
                userId: req.user.id,
                status: 'completed'
            } 
        });

       const dashboardData = {
           totalProjects,
           totalTasks,
           completedTasks
       };

       await redis.set(cacheKey, JSON.stringify(dashboardData)); // Cache for 1 hour

       res.json({
           fromCache: false,
           data: dashboardData
       });

    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};