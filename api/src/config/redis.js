const Redis =require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    
    
    retryStrategy: times => {
        if (times > 5) {
            console.error('Redis connection failed after 5 attempts');
            return null; // Stop retrying after 3 attempts
        }

        const delay = times * 429;
        console.log('Reconnection')
        return delay; // Wait 1s, 2s, 3s before retrying
    },
    
    
    
});


redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => 
    console.error('Redis error:', err)
);

module.exports = redis;