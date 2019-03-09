'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB.js');

//------------------------------------------
//執行資料庫動作的函式-查詢學生
//------------------------------------------
var fetchOneStudent = async function(couno){
    var result={};

    await query('select * from course where couno = $1', [couno])
        .then((data) => {
            result = {code:0, data:data.rows};  
        }, (error) => {
            result = {code:-1, data:[]};
        });
		
    return result;
}
//------------------------------------------

//匯出
module.exports = {fetchOneStudent};