'use strict';

//-----------------------
// 引用資料庫模組
//-----------------------
const { Client } = require('pg');

//-----------------------
// 自己的資料庫連結位址
//-----------------------
var pgConn = 'postgres://aztfiopwckcwtf:f82be8510e51b51874e187c04e64fbd483caa40e761bdbc410761b22502f5e48@ec2-54-83-201-84.compute-1.amazonaws.com:5432/d188jq1hm7j0iu'

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
        console.log('****async');
        //回覆查詢結果  
        client.query(sql, value, (err, results) => {                   
            if (err){
                reject(err);
                console.log('****err3');
                console.log(sql);
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