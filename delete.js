 //增加引用函式
 const deleteUser = require('./utility/deleteUser');

 deleteUser.deleteUser('130001').then(data => {  
     if(data == -9){                    
         console.log('執行錯誤');
     }else{
         console.log('已刪除' + data + '筆記錄');
     }  
 })