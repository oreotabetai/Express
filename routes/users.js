var express = require('express');
var router = express.Router();
// オブジェクトを渡したい
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
  // packageオブジェクトを渡す
  res.render('users', {
    package: package
  });
});

module.exports = router;
