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



//========================================
// 機器人接受訊息的處理
//========================================
bot.on('message', function(event) {    
    event.source.profile().then(
        function (profile) {
          
      
            //使用者傳來的學號
            const no = event.message.text;
          
            //呼叫API取得學生資料
            student.fetchStudent(no).then(data => {  
                if (data == -1){
                    event.reply('找不到資料');
                }else if(data == -9){                    
                    event.reply('執行錯誤');
                    console.log(no);
                }else{
                    /*if (data.formulation="null"){
                        data.formulation="";
                    }
                    if (data.package="null"){
                        data.package="";
                    }*/
                    event.reply([
                        
                        {'type':'text',
                         'text':"中文品名:"+data.medNameCh+"\n"
                         +"英文品名:"+ data.medNameEn+"\n"
                         +"外觀:"+ data.formulation+"  "+data.package+"\n"
                         + "適應症:"+ data.indication}]
                    );  
                }  
            })  
        }
    );
  });
  //--
  /*
  bot.on('message', function(event) {
      event.reply({
          "type": "template",
         
          "template": {
              "type": "buttons",
              "thumbnailImageUrl": "https://newone-1.herokuapp.com/imgs/med01.jpg",
              "imageAspectRatio": "rectangle",
              "imageSize": "cover",
              "imageBackgroundColor": "#FFFFFF",
              "title": "來克炎腸溶錠50公絲",
              "text": "DICLOREN E.C. TABLETS 50MG DICLOFENAC 'WEIDAR'",
              
              "actions": [
                  {
                    "type": "postback",
                    "label": "就是他",
                    "data": "action=buy&itemid=123"
                  },
                  
                  {
                    "type": "uri",
                    "label": "詳細資料",
                    "uri": "http://www.taiwan-pharma.org.tw/public/medicine_showdetail.php?sn=A028017100"
                  }
              ]
          }
        });
  });
  */
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