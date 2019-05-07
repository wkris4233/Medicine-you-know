'use strict';

//-----------------------
// 引用資料庫模組
//-----------------------
const { Client } = require('pg');

//-----------------------
// 自己的資料庫連結位址
//-----------------------
var pgConn = 'postgres://lmghruidaifgdr:80b8f3221d00f0e038cc62922f38fbf5263f542df203d72c4f4a2b7b923c49f3@ec2-54-197-232-203.compute-1.amazonaws.com:5432/d47mim1hf9e3e4';


//產生可同步執行query物件的函式
function query(sql, value=null) {
    return new Promise((resolve, reject) => {
        //設定資料庫連線物件
        var client = new Client({
            connectionString: pgConn,
            ssl: true
        })     

        //連結資料庫
        client.connect();

        //回覆查詢結果  
        client.query(sql, value, (err, results) => {                   
            if (err){
                reject(err);
            }else{			
                resolve(results);
            }

            //關閉連線
            client.end();
        });
    });
}

//匯出
module.exports = query;