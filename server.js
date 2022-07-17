const express = require('express');
const morgan = require('morgan');
const axios = require('axios').default;
const redis = require('redis');

const app = express();
const redisClient = redis.createClient();
const DEFAULT_EXPIRATION = 3600;

app.use(morgan("dev"));

// ++++++++++ Used redis to store frequent data Start ++++++++++

// app.get('/', async (req, res, next) => {
//     const albumId = req.query.albumId;
//     if (!redisClient.isReady) {
//         await redisClient.connect();
//     }
//     let photos = await redisClient.get('photos');
//     if (photos != null) {
//         console.log("Cache HIt");
//         let redisData = await JSON.parse(photos);
//         return res.send(redisData);
//     }
//     else {
//         console.log("Cache Miss");
//         const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', { params: { albumId } });
//         await redisClient.setEx('photos', DEFAULT_EXPIRATION, JSON.stringify(data));
//         res.json(data);
//     }
// })

// ++++++++++ Used redis to store frequent data End ++++++++++

// ++++++++++ Simple Api Hit without redis use  Start ++++++++++

app.get('/', async (req, res, next) => {
    const albumId = req.query.albumId;
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', { params: { albumId } });
    res.json(data);

})

// ++++++++++ Simple Api Hit without redis use  End ++++++++++

app.listen(3000, () => {
    console.log("Server is running...")
})