document.addEventListener("DOMContentLoaded",function(){
    send("init","");
    document.getElementById("level").onchange = function(){
       return optionChange(this.value);
    }
    document.getElementById("file").onchange = function(){
        return fileChange(this);
    }
    document.getElementById("fill").onclick = function(){
        return fileFill();
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

function optionChange(frame){
    send("change",frame); 
}

function fileChange(fileObject){
    if(fileObject.files.length != 0){
        document.getElementById("operateFile").style.display = "table-row";
    }else{
        document.getElementById("operateFile").style.display = "none";
    }
}

function fileFill(){
    var file = document.getElementById("file")[0];
    //将文件大小设置在300KB
    if(file.size > 300*1024){
        //TODO  文件大小超限
        return false;
    }
    var arrTemp = file.name.split(".");
    var fileType = arrTemp[arrTemp.length - 1];
    if(fileType = "txt"){
        return fileFillText(file);
    }else{
        //TODO  文件类型不支持
        document.getElementById("result").innerHTML = "<span>."+fileType+"文件类型暂不支持</span>"
        return false;
    }
}

function dealResponse(response){
    console.log(response);
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


