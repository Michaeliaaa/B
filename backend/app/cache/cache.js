const redis = require('ioredis');

const redisClient = new redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (err) => {
    console.log(`Something went wrong with redis client: ${err}`);
});

const EXPIRATION_TIME = 10;

module.exports = {
    getCacheData: (req, res, next) => {
        console.log('Retrieving cached data...');
        redisClient.get("reviews", (err, data) => {
            if (err) {
                console.log('Error getting data from cache');
                res.status(500).send(err);
            }
            if (data != null) {
                console.log('Cache Hit');
                res.send(JSON.parse(data));
            } else {
                console.log('Cache Miss');
                next();
            }
        });
    },
    setCacheData: (data) => {
        console.log('Caching data...');
        redisClient.setex("reviews", EXPIRATION_TIME, JSON.stringify(data));
    }
};
