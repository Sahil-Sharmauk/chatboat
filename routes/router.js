const express = require('express');
const route = express.Router()
const chat = require('../controllers/chatController.js')


route.get('/', (req, res) => {
    res.render('index.ejs')
});

route.post('/api/chat',chat);


module.exports = route