document.addEventListener("DOMContentLoaded",function(){
    //页面打开时获取iframe的层级结构并填充
    var level = document.getElementById("level");
    var result = document.getElementById("result");
    var levelObject = send("init","","");
});


function send(action,contentType,content){
    var returnResult;
    sendMesssageToContentScript({
        action:action,
        contentType:contentType,
        content:content
    },function(response){
        returnResult = response;
    });
    document.writeln(returnResult);
    return returnResult;
}

function sendMesssageToContentScript(message,callback){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,message,function(response){
            if(chrome.runtime.lastError){
                //通信异常
                document.writeln(chrome.runtime.lastError.message);
            }else if(callback) callback(response);
        });
    });
}

