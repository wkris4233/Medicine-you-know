//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');

//增加引用函式
const student = require('./utility/student.js');

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

//========================================
// 機器人接受訊息的處理
//========================================
bot.on('message', function(event) {  

  if (event.message.type = 'text') {
    var msg = event.message.text;
    if(msg=="提醒用藥") remind();
    //新增提醒
    if(rem==1){
      if(msg=="新增提醒") add_med();
      if(msg=="感冒" || msg=="糖尿病" || msg=="高血壓" || msg=="其他的藥物") {
        med = event.message.text;
        add_week();
      }
      if(msg.indexOf('星期') != -1 || msg=="每天"){
        week = event.message.text;
        add_time();
      }
      if(msg.indexOf('是') != -1) add_yes();
      if(msg.indexOf('不對') != -1) add_no();
    }
    if(rem==2){
      if(msg=="藥物種類") add_med();
      if(msg=="提醒日期") add_week();
      if(msg=="提醒時間") add_time();
      if(msg=="感冒" || msg=="糖尿病" || msg=="高血壓" || msg=="其他的藥物") {
        med = event.message.text;
        add_check();
      }
      if(msg.indexOf('星期') != -1 || msg=="每天"){
        week = event.message.text;
        add_check();
      }
      if(msg.indexOf('是') != -1) add_yes();
      if(msg.indexOf('不對') != -1) add_no();
    }

    //查看紀錄

  }  


    event.source.profile().then(
        function (profile) {
          
      
            //使用者傳來的學號
            const no = event.message.text;
          
            //呼叫API取得學生資料
            student.fetchStudent(no).then(data => {  
                if (data == -1){
                    event.reply('找不到資料');
                }else if(data == -9){                    
                    event.reply('無法辨認你說的意思');
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

  //========================================
  //提醒用藥
  //========================================
  function remind(){
    rem=1;
    event.reply({
      "type": "template",
      "altText": "新增或查看",
      "template": {
          "type": "confirm",
          "text": "你要新增提醒吃藥的時間呢？還是要查看之前的提醒紀錄？",
          "actions": [
              {
                "type": "message",
                "label": "新增提醒",
                "text": "新增提醒"
              },
              {
                "type": "message",
                "label": "查看紀錄",
                "text": "查看紀錄"
              }
          ]
      }
    });
  };
  function add_med(){
    event.reply({
      "type": "template",
      "altText": "提醒用藥分類",
      "template": {
          "type": "buttons",
          "text": "需要提醒什麼種類的藥呢？",
          "actions": [
              {
                "type": "message",
                "label": "感冒",
                "text": "感冒"
              },
              {
                "type": "message",
                "label": "糖尿病",
                "text": "糖尿病"
              },
              {
                "type": "message",
                "label": "高血壓",
                "text": "高血壓"
              },
              {
                "type": "message",
                "label": "其他的藥物",
                "text": "其他的藥物"
              }
          ]
      }
    });
  };
  function add_week(){
    event.reply([
      {
        "type": "text",
        "text": "需要哪些天提醒呢？"
      },
      {
        "type": "template",
        "altText": "this is a image carousel template",
        "template": {
            "type": "image_carousel",
            "columns": [
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "每天",
                  "text": "每天"
                }
              },
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "星期一",
                  "text": "星期一"
                }
              },
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "星期二",
                  "text": "星期二"
                }
              },
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "星期三",
                  "text": "星期三"
                }
              },
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "星期四",
                  "text": "星期四"
                }
              },
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "星期五",
                  "text": "星期五"
                }
              },
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "星期六",
                  "text": "星期六"
                }
              },
              {
                "imageUrl": "https://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg",
                "action": {
                  "type": "message",
                  "label": "星期日",
                  "text": "星期日"
                }
              }
            ]
        }
      }
    ]);
  };


  function add_time(){
    event.reply({
      "type": "template",
      "altText": "選擇提醒時間",
      "template": {
          "type": "buttons",
          "text": "要在幾點提醒呢？",
          "actions": [
              {
                "type": "datetimepicker",
                "label": "選擇時間",
                "data": "t2",
                "mode": "time",
              }
          ]
      }
    });
  };

  function add_yes(){
    rem = 0;
    event.reply({
      "type": "text",
      "text": "好的！那我會在" + week + time + "時提醒你吃" + med + "的藥!"
    });
    showTime(); 
  };

  function add_no(){
    rem = 2;
    event.reply({
      "type": "template",
      "altText": "更改提醒錯誤",
      "template": {
          "type": "buttons",
          "text": "我記錯了什麼內容呢？",
          "actions": [
              {
                "type": "message",
                "label": "藥物種類",
                "text": "藥物種類"
              },
              {
                "type": "message",
                "label": "提醒日期",
                "text": "提醒日期"
              },
              {
                "type": "message",
                "label": "提醒時間",
                "text": "提醒時間"
              }
          ]
      }
    });
  };
  
  function add_check(){
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
  };


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

//========================================

// 主動發送訊息
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