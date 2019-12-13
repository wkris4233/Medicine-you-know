'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');
//------------------------------------------
// 由關鍵字查詢藥品資料
//------------------------------------------

var med=async function (event){
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
              "text": "感冒藥",
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
                  "text": "星期一",
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
                  "text": "12:00",
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


