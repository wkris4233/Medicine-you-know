 //增加引用函式
 const addUser = require('./utility/addUser');

 addUser.addUs('130001' ,'abc123', '王曉明').then(data => {  
     if(data == -9){                    
         console.log('執行錯誤');
     }else{
         console.log('已增加' + data + '筆記錄');
     }  
 })