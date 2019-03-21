'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB.js');


//------------------------------------------
// 由學號查詢學生資料
//------------------------------------------
var fetchStudent = async function(stuNo){
    //存放結果
    let result;  

    //讀取資料庫
    await query('select * from student where stuno = $1', [stuNo])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];  //學生資料(物件)
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;  
}




//------------------------------------------
// 由學號查詢學生成績
//------------------------------------------
var fetchScores = async function(stuNo){
    //存放結果
    let result; 

    //讀取資料庫
    await query('select a.score, b.course from score a, course b where a.couno = b.couno and a.stuno = $1', [stuNo])
        .then((data) => {   
            if(data.rows.length > 0){
                result = data.rows;   //成績資料(陣列)
            }else{
                result = -1;  //找不到資料
            }                      
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
    return result;
}



//匯出
module.exports = {fetchOneStudent};