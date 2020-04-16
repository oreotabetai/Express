const express = require('express');
const router = express.Router();
// mongodbを使用
const mongoose = require('mongoose');

// デフォルト
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

const kittySchema = new mongoose.Schema({
    name: String
});

// 自作メソッド作成
kittySchema.methods.speak = function () {
    const noName = "名前がない";
    const greeting = this.name ? "名前は" + this.name : noName;
    console.log(greeting);
}

// 名前を登録せず実行する
kittySchema.methods.speak();
// kittyモデルを作成
const Kitten = db.model('kitten', kittySchema);
const tama = new Kitten({ name: 'Tama' }); // 名前を登録
tama.speak();

// 保存 async/awaitで非同期の処理が終わった後に実行
async function tamaFunc() {
    await tama.save((err, tama) => {
        if (err) { console.error(err); }
        else {
            console.log("保存");
            console.log(tama);
        }
    });
    // ドキュメントの取得
    Kitten.find((err, tama) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("全てのデータの取得");
            console.log(tama);
        }
    });
}
// Tamaをmikeに更新する
function tamaupdate() {
    Kitten.findOne({ name: "Tama" }, function (err, tama) {
        if (err) { console.error(err); }
        else {
            // 名前の更新
            console.log("Tamaのデータを1つ取得");
            tama.name = "mike";
            tama.save((err) => {
                if (err) console.error(err);
            });
            console.log(tama);
        }
    });
}

function tamadelete() {
    Kitten.findOne({ name: "mike" }, function (err, tama) {
        if (err) {
            console.error(err);
        } else {
            console.log("mikeを削除")
            tama.remove();
            console.log(tama);
        }
    });
}

tamaFunc();
tamaupdate();
tamadelete();

router.get('/', function (req, res, next) {
    res.render('mongo');
});

module.exports = router;