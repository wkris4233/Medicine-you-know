'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');
   
//------------------------------------------
// 新增學生資料
//------------------------------------------
var addUs = async function(usId, usName){
    //存放結果
    let result;  

    //讀取資料庫
    await query('insert into "user" values ($1, $2)', [usId ,usName])
        .then((data) => {
            result = data.rowCount;  //新增資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}
//------------------------------------------

//匯出
module.exports = {addUs};