var express = require('express');
var router = express.Router();

var package = {
  title: 'jadeの作り方',
  description: 'cool page',
  keywords: [
    'syosinn',
    'beginner'
  ]

};
/* GET users listing. */
router.get('/', function (req, res, next) {
  // 自作のjadeファイルを適用

  res.render('users');
});

// users/cool
router.get('/cool', function (req, res, next) {
  res.send('You`re so cool');
});
module.exports = router;
