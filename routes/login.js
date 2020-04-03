const express = require('express');
const router = express.Router();

// loginに接続したとき
router.get('/', function (req, res, next) {
    // login.jsを読み込む
    res.render('login');
});

router.post('/', function (req, res, next) {
    if (req.body.userName) {
        req.session.user = { name: req.body.userName };
        res.redirect('../');
    } else {
        const err = '入力が正しくない';
        res.render('login', { error: err });
    }
});

module.exports = router;