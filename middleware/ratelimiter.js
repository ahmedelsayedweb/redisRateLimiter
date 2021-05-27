const redis = require('redis');
const redisClient = redis.createClient();
const requestIp = require('request-ip');

redisClient.on("ready", function () {
    console.log("Redis connection ready ");
});
const rateLimiter = (req, res, next) => {
    const ip = requestIp.getClientIp(req)
    redisClient.get('connect' + ip, (err, reply) => {
        if (reply >= 3) {
            return res.status(429).json({ "error": 1, "message": "Too Many Requests..." });
        } else if (reply > 0) {
            redisClient.incrby('connect' + ip, 1);
        } else {
            redisClient.set('connect' + ip, 1, 'EX', 60);
        }
        next()
    })
}
module.exports = rateLimiter