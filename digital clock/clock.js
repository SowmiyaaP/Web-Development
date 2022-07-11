function time(){
var date= new Date();
var hour = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
if((hour=>0)&&(hour<=12)){
    var session = "AM";
}
else{
    var session ="PM";
}
if(hour<10){
    hour = "0" + hour;
}
if(min<10){
    min = "0" + min;
}
if(sec<10){
    sec = "0" + sec;
}
document.getElementById("Clock").innerHTML = hour + ":" + min + ":" + sec + "   " + session;
setTimeout(time,1000);
}
time();