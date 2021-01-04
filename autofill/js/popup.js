document.addEventListener("DOMContentLoaded",function(){
    send("init","");
    document.getElementById("level").onchange = function(){
       return optionChange(this.value);
    }
});

function send(action,content){
    sendMesssageToContentScript({
        action:action,
        content:content
    },function(response){
        if(action == "init"){
            initLevel(response);
        }else{
            dealResponse(response);
        }
        
    });
}

function initLevel(response){
    response = JSON.parse(response);
    var level = document.getElementById("level");
    var iframesLength = response.returnContent.iframesLength;
    var framesLength = response.returnContent.framesLength;
    var option = document.createElement("option");
    option.value = "top";
    option.innerText = "top";
    level.appendChild(option);
    for(var i = 0; i < iframesLength; i ++){
        option = document.createElement("option");
        option.value = "iframe_"+i;
        option.innerText = "iframe_"+i;
        level.appendChild(option);
    }
    for(var i = 0; i < framesLength; i ++){
        option = document.createElement("option");
        option.value = "frame_"+i;
        option.innerText = "frame_"+i;
        level.appendChild(option);
    }
}

function dealResponse(response){
    console.log(response);
}

function optionChange(frame){
    send("change",frame); 
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


