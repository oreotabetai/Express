// npm で読み込んだモジュールを使える npm install がいる
const express = require('express');
const app = express();

// パスにアクセスされるたびに呼び出されるコールバック関数を定義する
app.get('/', function (req, res) {
    // レスポンスを返す
    res.send('Hellow World');
});

app.listen(8000, function () {
    console.log('listening on port 8000');
});
