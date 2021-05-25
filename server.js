// Import the installed modules.
const express = require('express');
const router = express.Router()
const rateCheck = require('./middleware/ratelimiter')

const app = express();

router.get('/search', function (req, res, next) {
    res.send('API response')
    next()
})

app.use(rateCheck)
app.use('/api', router)
// app.use(rateLimiterRedisMiddleware);
app.listen(5000, () => {
    console.log('Server listening on port: ', 5000);
});