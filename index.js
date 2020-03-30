var express = require('express');
// ミニアプリケーション
var router = express.Router();

// コールバック関数には引数にnextを指定
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function (req, res) {
    res.send('index page');
});

router.get('/about', function (req, res) {
    res.send('About home');
});

module.exports = router;