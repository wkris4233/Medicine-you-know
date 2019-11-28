'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//------------------------------------------
// 刪除會員資料
//------------------------------------------
var deleteUser = async function(no){
    //存放結果
    let result;  

    //刪除會員資料
    await query('delete from "user" where "usNo" = $1', [no])
        .then((data) => {
            result = data.rowCount;  //刪除資料數 
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}
//------------------------------------------

//匯出
module.exports = {deleteUser};