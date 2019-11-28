//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

//增加引用函式
const student = require('./utility/student.js');


//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1553334045',
    channelSecret: 'ec6bc0f096e29b5fff7e8af115e8d6b1',
    channelAccessToken: 'f0bK6NHPzp383Ia8AgRrY4EbeE9Be6sEnh8WqhRKFOR3264N9U+g6RqkoHJbegcR0oh9AWzwrsf+5fndCTnu0M0LQOKpRT7U1Y7LymMTxJjFr7h9TgzdCMLmo2FvTFwY9I+CIHUks01ypKfO0ug2EAdB04t89/1O/w1cDnyilFU='
});


//查詢附近院所新增變數
var locNum=0;
var locText;


//========================================
// 機器人接受訊息的處理
//========================================
bot.on('message', function(event) {  

  
    //位置
    if(msg=="查詢附近院所"){
      loc();
    }
    
    if(msg=="新北市"){
      showLoc();
    }



   
  else if (event.message.type == 'location'){
      
    showLoc();
        

  

  
    


//========================================
//查詢位置
//========================================
  function loc(){
    
    event.reply({      
      "type": "template",
      "altText": "查詢附近院所",
      "template": {
        "type": "buttons",
        "text": "查詢附近院所",
        "actions": [
          {
            "type":"location",
            "label":"開啟位置資訊"            
          }
        ]
      }
    });
    locNum = 1;

  };


  function showLoc(){
    
    event.reply(
      {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
          "type": "carousel",
          "columns": [
            {
              
              "title": "一誠藥局",
              "text": "新北市板橋區府中路62號",
              "actions": [
                {
                  "type": "uri",
                  "label": "顯示地圖",
                  "uri": "https://goo.gl/maps/mbNWqQuUfMRaHQ2z6"
                  
                }
              ]
            },
            {
              
              "title": "廣泰藥局",
              "text": "新北市板橋區館前西路150號",
              "actions": [
                {
                  "type": "uri",
                  "label": "顯示地圖",
                  "uri": "https://goo.gl/maps/zbmZchRQ5CwuC3C18"
                }
              ]
            },
            {
              
              "title": "長青連鎖藥局 皇慶藥局",
              "text": "新北市板橋區南門街81號",
              "actions": [
                {
                  "type": "uri",
                  "label": "顯示地圖",
                  "uri": "https://goo.gl/maps/oSdCXzA3zZY2Fvgh8"
                }
              ]
            }
          ]
        }
      }

    );
  };

  /*
  function handleLocation(message, replyToken) {
    return client.replyMessage(
      replyToken,
      {
        type: 'location',
        title: message.title,
        address: message.address,
        latitude: message.latitude,
        longitude: message.longitude,
      }
    );
  }
  */

  //========================================
  //提醒用藥
  //========================================
  


 
  //========================================


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
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});