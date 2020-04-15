// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// 自分のjsファイル
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var mongo = require('./routes/mongo');

var app = express();

// view engine setup
// __dirnameはグローバル変数 ディレクトリ名まで path.joinはパスを結合している
app.set('views', path.join(__dirname, 'views'));
// jadeをテンプレートとする
app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// 静的ファイルを処理するため
app.use(express.static(path.join(__dirname, 'public')));

// indexRouterじゃないとエラー 上で定義
app.use('/', index);
app.use('/users', users);
// mongoを扱うページ
app.use('/mongo', mongo);

// 404のレスポンス用
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler 
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
