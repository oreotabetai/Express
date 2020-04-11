var express = require('express');
var router = express.Router();

/* /indexの接続時の挙動 */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
