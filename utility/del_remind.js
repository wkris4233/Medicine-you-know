'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//========================================
//刪除
//========================================
function med(event){
    event.reply({
      "type": "template",
      "altText": "確認刪除提醒",
      "template": {
          "type": "confirm",
          "text": "確認要刪除...提醒嗎？",
          "actions": [
              {
                "type": "message",
                "label": "確定",
                "text": "確定刪除提醒"
              },
              {
                "type": "message",
                "label": "否",
                "text": "沒有要刪除提醒"
              }
          ]
      }
    });
  };
//--是否刪除_yes------------------------------
function yes(event){
    event.reply({
      "type": "text",
      "text": "已刪除完畢！"
    });
  };

//--是否刪除_no-------------------------------
function no(event){
    event.reply({
      "type": "text",
      "text": "好的！那有問題再呼叫我喔！"
    });
  };
//============================================


//匯出
module.exports = {med,yes,no};