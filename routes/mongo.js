const express = require('express');
const router = express.Router();
// mongodbを使用
const mongoose = require('mongoose');

// デフォルト
//const mongoDB = ('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true, useNewUrlParser: true });

// グローバルプロセスのライブラリを使用する
mongoose.Promise = global.Promise;
// デフォルトのコネクション 
const db = mongoose.connection;

// エラー時
db.on('error', console.error.bind(console, 'mongo 接続エラー '));
//コネクション時
db.once('open', () => {
    console.log('DB接続中');
});

const kittySchema = mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
console.log('子猫の名前: ', silence.name);

router.get('/', function (req, res, next) {
    res.render('mongo');
});

module.exports = router;