'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');
//------------------------------------------
// 由關鍵字查詢藥品資料
//------------------------------------------
var med = async function(eventusId){
  //存放結果
  let result;  

  //讀取資料庫
  await query('SELECT * from "remDetail" where remDetail."usId" LIKE $1',[usId])
      .then((data) => {

          if(data.rows.length > 0){
              result = data.rows[0];  //學生資料(物件)
              console.log('****dataFind');
              medTxt(data.week,data.time,data.medKind)
          }else{
              result = -1;  //找不到資料
          }    
      }, (error) => {
          result = -9;  //執行錯誤
          console.log('****err1');
      });

  //回傳執行結果
  return result;  
}

var medTxt=async function (week,time,medKind){
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
              "text": medKind,
              "size": "xl",
              "align": "start",
              "weight": "bold"
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
                  "text": "間隔時間:"
                },
                {
                  "type": "text",
                  "text": week,
                  "size": "lg",
                  "weight": "bold"
                }
              ]
            },
            {
              "type": "box",
              "layout": "horizontal",
              "contents": [
                {
                  "type": "text",
                  "text": "提醒時間:"
                },
                {
                  "type": "text",
                  "text": time,
                  "size": "lg",
                  "weight": "bold"
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "horizontal",
          "flex": 1,
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "刪除此提醒",
                "text": "刪除提醒"
              },
              "style": "secondary"
            }
          ]
        }
      }
    });
};

//------------------------------------------

//匯出
module.exports = {med};


