function log(event,kwt){
    
    event.reply({      
      "type": "template",
      "altText": "查詢附近院所",
      "template": {
        "type": "location",
        "text": "查詢附近院所",
        "actions": [
          {
            "type":"location",
            "label":"開啟位置資訊"            
          }
        ]
      }
    });


console.log(msg.getTitle);
}
