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
    console.log('DB接続中...');
});

const kittySchema = mongoose.Schema({
    name: String
});

// const Kitten = mongoose.model('Kitten', kittySchema); // モデル作成1

// const silence = new Kitten({ name: 'Silence' });
// console.log('子猫の名前: ', silence.name);
// 自作メソッド作成
kittySchema.methods.speak = function () {
    const noName = "名前がない";
    const greeting = this.name ? "名前は" + this.name : noName;
    console.log(greeting);
}

// 名前を登録せず実行する
kittySchema.methods.speak();
// モデル作成2
const Kitten = mongoose.model('Kitten', kittySchema);
const tama = new Kitten({ name: 'Tama' }); // 名前を登録
tama.speak();

// 保存 async/awaitで非同期の処理が終わった後に実行
async function tamaFunc() {
    await tama.save(() => {
        if (err) console.err(err);
        console.log(kitten);
    });
}
router.get('/', function (req, res, next) {
    res.render('mongo');
});

module.exports = router;