const Redis =require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || null,
    
    retryStrategy: times => {
        if (times > 3) {
            console.error('Redis connection failed after 3 attempts');
            return null; // Stop retrying after 3 attempts
        }
        return times * 1000; // Wait 1s, 2s, 3s before retrying
    },
    lazyConnect: true,
    
    
});

redis.connect().catch(() => {
    console.error('Failed to connect to Redis');
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => 
    console.error('Redis error:', err.message)
);

module.exports = redis;