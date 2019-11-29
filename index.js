//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
//增加引用函式
const findMed = require('./utility/findMed');
const addUser = require('./utility/addUser');
const add_remind = require('./utility/add_remind');
const del_remind = require('./utility/del_remind');
const readMed = require('./utility/readMed');
// set timezone 抓取台灣時間
process.env.TZ = 'Asia/Taipei';
//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: '1553334045',
    channelSecret: 'ec6bc0f096e29b5fff7e8af115e8d6b1',
    channelAccessToken: 'f0bK6NHPzp383Ia8AgRrY4EbeE9Be6sEnh8WqhRKFOR3264N9U+g6RqkoHJbegcR0oh9AWzwrsf+5fndCTnu0M0LQOKpRT7U1Y7LymMTxJjFr7h9TgzdCMLmo2FvTFwY9I+CIHUks01ypKfO0ug2EAdB04t89/1O/w1cDnyilFU='
});
//=========育婷==區域=========================================================
//提醒用藥新增變數
var rem = 0;
var med, week, time, userId;
var timer1;

//========================================
// 機器人接受回覆的處理
//========================================
bot.on('postback', function(event) { 
    time = event.postback.params.time;

    event.source.profile().then(function (profile) {
        
        userId = profile.userId;
        event.reply({
          "type": "template",
          "altText": "確認提醒內容",
          "template": {
              "type": "confirm",
              "text": "你是要在" + week + "的" + time + "吃" + med + "的藥, 對嗎？",
              "actions": [
                  {
                    "type": "message",
                    "label": "是的",
                    "text": "是的，沒錯"
                  },
                  {
                    "type": "message",
                    "label": "不對",
                    "text": "不對，有錯誤"
                  }
              ]
          }
        });   
    });
});
//========================================
// 機器人接受訊息的處理
//========================================
bot.on('message', function(event) {    
    var kwt = event.message.type; //--kWtype key word type
    var msg = event.message.text; //--msg 
    var n ; 
    if(msg=='查詢附近院所'){
        log(event,kwt,n);
    }
    if(kwt='location'){
       
        console.log(event.message.address);
    }
    //-----------------------------------------
    if (kwt = 'text') {
       
        switch(msg){
            
            case '提醒用藥': 
                add_remind.remind(event)
                break
            case '新增提醒':
                rem = 1
                add_remind.med(event)
                break
            case '查看紀錄':
                readMed.med(event)
                break
            case '刪除提醒' :
                del_remind.med(event);
                break
            case '確定刪除提醒':
                del_remind.yes(event);
                break
            case '沒有要刪除提醒':
                del_remind.no(event);
                break
        }
 
        switch(rem){
            case 1:
                if(msg=='感冒' || msg=='糖尿病' || msg=='高血壓' || msg=='其他的藥物') {
                med= msg
                add_remind.week(event)
                }
                if(msg.indexOf('星期') != -1 || msg=="每天"){
                    week = msg;
                    add_remind.time(event,week,time,med);
                  }
                  if(msg.indexOf('是') != -1) {
                    //-add_remind.yes(event)
                    event.reply({
                        "type": "text",
                        "text": "好的！那我會在" + week + time + "時提醒你吃" + med + "的藥!"
                      });
                    rem=0
                    showTime()
                  }
                  
                  if(msg.indexOf('不對') != -1){
                    rem = 2
                    add_remind.no(event)
                  }
                
            case 2:
                switch(msg){
                    case '藥物種類':
                        add_remind.med(event)
                        break
                    case '提醒日期':
                        add_remind.week(event)
                        break
                    case '提醒時間':
                        add_remind.time(event)
                        break
                    case '感冒' || '糖尿病' || '高血壓' || '其他的藥物' :
                        med=msg
                        add_remind.check(event)
                        break
                }
                switch(msg.indexOf){
                    case ('星期'!=-1||msg == '每天') :
                            week = msg
                            add_time(event);
                            break
                    case ('是'!=-1):
                        add_remind.yes(event)
                        break
                    case('不對'!=-1):
                        add_remind.no(event)
                        break
                }
        }
    
    //呼叫API取得藥品資料
    if(event.message.address!=null){
            event.source.profile().then(function (profile) {
                event.reply({
       
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
               });
           
              });
       
    }else if(msg!='提醒用藥'){
        findMed.fetchMedicine(msg).then(data => { 
           
            if (data == -1){
                event.reply('請再重新輸入一次');
                console.log(msg);
            }else if(data == -9){                    
                event.reply('無法辨認你說的意思');
              
            }else{
              event.reply({
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                  "type": "bubble",
                  "direction": "ltr",
                  "body": {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": data.medNameCh,
                        "size": "lg",
                        "align": "start",
                        "weight": "bold",
                        "wrap": false
                      },
                      {
                        "type": "text",
                        "text": data.medNameEn,
                        "size": "xs",
                        "align": "start",
                        "wrap": true
                      },
                      {
                        "type": "separator"
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": "外觀: ",
                            "flex": 3,
                            "color": "#999898"
                          },
                          {
                            "type": "text",
                            "text": data.formulation+data.package,
                            "flex": 8,
                            "wrap": true
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [
                          {
                            "type": "text",
                            "text": "適應症: ",
                            "flex": 3,
                            "color": "#999898"
                          },
                          {
                            "type": "text",
                            "text": data.indication,
                            "flex": 8,
                            "align": "start",
                            "gravity": "center",
                            "wrap": true
                          }
                        ]
                      }
                    ]
                  }
                }
              }); 
               
            }  
        })
    }
    
}  
   
       
       
    
    //-----------------------------------------
    });

//========================================
//--showTime()----------------------------
function showTime(){
    clearTimeout(timer1);

    //var userId = 'Uc06508e2f98922cacce2c8e489a24f84';
    var today = new Date();
    var h = (today.getHours()<10 ? '0'+(today.getHours()) : today.getHours()); //h=h+8;
    var m = (today.getMinutes()<10 ? '0'+(today.getMinutes()) : today.getMinutes());
    var nowTime = h + ":" + m;

    if(nowTime == time){
      bot.push(userId, ["已經"+time+"了，記得要吃"+med+"的藥喔！"]);
    /*console.log('userId: ' + userId);
    console.log('send: ' + nowTime);*/
      return;      
    }

    timer1 = setInterval(showTime, 10000);

};

function log(event,kwt,n){
    
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
     n=1;   

  };
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