document.addEventListener("DOMContentLoaded",function(){
    //页面打开时获取iframe的层级结构并填充
    var level = document.getElementById("level");
    var result = document.getElementById("result");
    window.onload = function(){
        var levelObject = send("init","","");
        console.log(levelObject);
    }
});


function send(action,contentType,content){
    var response;
    sendMesssageToContentScript({
        action:action,
        contentType:contentType,
        content:content
    },function(response){
        response = response;
    });
    return response;
}

function sendMesssageToContentScript(message,callback){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,message,function(response){
            if(callback) callback(response);
        });
    });
}

