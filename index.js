//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');


//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1553334045',
    channelSecret: 'ec6bc0f096e29b5fff7e8af115e8d6b1',
    channelAccessToken: 'f0bK6NHPzp383Ia8AgRrY4EbeE9Be6sEnh8WqhRKFOR3264N9U+g6RqkoHJbegcR0oh9AWzwrsf+5fndCTnu0M0LQOKpRT7U1Y7LymMTxJjFr7h9TgzdCMLmo2FvTFwY9I+CIHUks01ypKfO0ug2EAdB04t89/1O/w1cDnyilFU='
});


//----------------------------------------
// 機器人接受訊息的處理
//----------------------------------------
bot.on('message', function(event) {

if(event.message.then ==1){
    event.reply('Hello'); 
}
else{
    event.reply('Hello, 你好');
}
});


//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);


//----------------------------------------
// 可直接取用檔案的資料夾
//----------------------------------------
app.use(express.static('public'));


//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    console.log("正在監聽埠號:", port);
});