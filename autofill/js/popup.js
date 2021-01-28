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
        }else if(action == "fill"){
            response = JSON.parse(response);
            dealResult(response.returnCode,response.returnContent);
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

function dealResult(returnCode,returnContent){
    // console.log(`${returnCode} : ${returnContent}`)
    var result;
    if(returnCode.indexOf("E") != -1){
        result = document.createElement("span");
        result.innerText = returnContent;
        result.style.color = "yellow";
        document.getElementById("result").appendChild(result);
    }
    if(returnCode.indexOf("W") != -1){
        result = document.createElement("span");
        result.innerText = returnContent;
        result.style.color = "yellow";
        document.getElementById("result").appendChild(result);
    }
    if(returnCode.indexOf("S") != -1){
        result = document.createElement("span");
        result.innerText = returnContent;
        document.getElementById("result").appendChild(result);
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
    //清空原有内容
    var result = document.getElementById("result");
    var children = result.children;
    for (var i = children.length - 1; i >= 0; i--) {
        result.removeChild(children[i]);
    }

    var file = document.getElementById("file").files[0];
    //将文件大小设置在300KB
    if(file.size > 300*1024){
        //文件大小超限
        return dealResult("W001","文件大小超限");
    }
    var arrTemp = file.name.split(".");
    var fileType = arrTemp[arrTemp.length - 1];
    if(fileType.toUpperCase() == "TXT"){
        fileFillText(file);
    }else{
        //文件类型不支持
        dealResult("W002","文件类型暂不支持")
    }
}

function dealResponse(response){
    console.log(response);
}

function sendMesssageToContentScript(message,callback){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,message,function(response){
            if(chrome.runtime.lastError){
                dealResult("E001","前后台通讯异常")
                console.log(chrome.runtime.lastError.message);
            }else if(callback) callback(response);
        });
    });
}


