'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');
// set timezone 抓取台灣時間
process.env.TZ = 'Asia/Taipei';
//========================================
//提醒用藥
//========================================

//--新增或查看 吃藥紀錄----------------------------------
var remind = async function(event) {
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
//============================================
//--add_med()--------------------------------
var med = async function(event){
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
//--add_week()-------------------------------
var week = async function(event){
    event.reply([
      {
        "type": "text",
        "text": "需要哪些天提醒呢？"
      },
      {
        "type": "flex",
        "altText": "Flex Message",
        "contents": {
          "type": "carousel",
          "contents": [
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49039015277_7fdfb7b759_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "每天提醒",
                      "text": "每天"
                    }
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49039015187_a7e84411d7_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "星期一提醒",
                      "text": "星期一"
                    }
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49039014722_6d578aa816_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "星期二提醒",
                      "text": "星期二"
                    }
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49039015067_5c82441185_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "星期三提醒",
                      "text": "星期三"
                    }
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49038297423_eba1f4da88_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "星期四提醒",
                      "text": "星期四"
                    }
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49038297323_56c84a5fe6_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "星期五提醒",
                      "text": "星期五"
                    }
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49039014812_aca1c307fb_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "星期六提醒",
                      "text": "星期六"
                    }
                  }
                ]
              }
            },
            {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://live.staticflickr.com/65535/49038297028_330268468a_m.jpg",
                "size": "full",
                "aspectRatio": "2:1",
                "aspectMode": "cover",
                "backgroundColor": "#FFFFFF"
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "flex": 0,
                "spacing": "none",
                "contents": [
                  {
                    "type": "button",
                    "action": {
                      "type": "message",
                      "label": "星期日提醒",
                      "text": "星期日"
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]);
};
//--add_time()--------------------------------
var time = async  function(event){
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
//--add_yes()---------------------------------
var yes = async  function(event,week,time,med){
    event.reply({
      "type": "text",
      "text": "好的！那我會在" + week + time + "時提醒你吃" + med + "的藥!"
    });
    
  };
//--add_no()----------------------------------
var no = async  function (event){
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
//--add_check()-------------------------------
var check = async  function(event){
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

//===== 更改開始===================================
//--addRem()----------------------------------
var n = async function(event){
  await query('select * from "remDetail" ').then ((data)=>{
    console.log(data.rows.length);
    console.log(data.rowCount);
  });
}
var addRem = async function(event,usId,week,time,medKind){
      
    let result;
       n(event);
        //讀取資料庫
        await query('insert into "remDetail" values ($1, $2,$3,$4,$5)', ['1',usId,week,time,medKind])
            .then((data) => {
                result = data.rowCount;  //新增資料數 
            }, (error) => {
                result = -9;  //執行錯誤
            });
      
      return  console.log('已增加' + result + '筆記錄');
    
      

    
}

//--addUser()---------------------------------
var addUser = async function(event,usId,usName){
  var num;
  await query('SELECT * from "user" where user."usId" LIKE $1',[usId])
  .then((data) => {

      if(data.rows.length > 0){
         
      }else{
              //讀取資料庫
          await query('insert into "user" values ($1,$2,$3)', [usId ,usName,'Y'])
          .then((data) => {
            console.log( data.rowCount);  //新增資料數 
          }, (error) => {
            console.log("新增使用者錯誤");  //執行錯誤
            console.log(usId);
            console.log(usName);
      });
      }    
  }, (error) => {
      result = -9;  //執行錯誤
      console.log('****err1');
  });
  
}
//--save()------------------------------------
var save = async function(event){


  event.reply({
    "type": "template",
    "altText": "個資儲存",
    "template": {
        "type": "confirm",
        "text": "你是否願意讓{藥你知道}儲存你的個人資料?",
        "actions": [
            {
              "type": "message",
              "label": "同意",
              "text": "同意"
            },
            {
              "type": "message",
              "label": "不同意",
              "text": "不同意"
            }
        ]
    }
  });
}


//==更改結束=========================================


//匯出
module.exports = {remind,med,week,time,yes,no,check,addRem,addUser,save,n};