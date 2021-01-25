//frame及iframe处理，后续写入cookie
var iframes = document.getElementsByTagName("iframe");
var frames  = document.getElementsByTagName("frame");
var frameLen = frames.length;
var iframeLen = iframes.length;
var documentColor;
var domCurrent;
var returnCode;
var returnContent

function responseInit(){
    returnCode = "S000";
    returnContent = "{\"framesLength\":\""+frameLen+"\",\"iframesLength\":\""+iframeLen+"\"}";
    return `{"returnCode":"${returnCode}","returnContent":${returnContent}}`;
}

function responseChange(frame){
    if(frame == "top"){
        domCurrent = document;
    }else{
        arrFrame = frame.split("_");
        if(arrFrame[0] == "frame"){
            try{
                domCurrent = frames[parseInt(arrFrame[1])].contentWindow.document;
                documentColor = domCurrent.body.style.backgroundColor;
                domCurrent.body.style.backgroundColor = "green";
                setTimeout("domCurrent.body.style.backgroundColor = documentColor",200);
                returnCode = "S000";
                returnContent = "此frame支持填充";
            }catch(error){
                console.log(error);
                returnCode = "E002";
                returnContent = "此frame链接跨域，无法填充"
            }
        }else{
            try{
                domCurrent = iframes[parseInt(arrFrame[1])].contentWindow.document;
                documentColor = domCurrent.body.style.backgroundColor;
                domCurrent.body.style.backgroundColor = "green";
                setTimeout("domCurrent.body.style.backgroundColor = documentColor",200);
                returnCode = "S000";
                returnContent = "此iframe支持填充";
            }catch(error){
                console.log(error);
                returnCode = "E003";
                returnContent = "此iframe链接跨域，无法填充"
            }
        }
    }
    return `{"returnCode":"${returnCode}","returnContent":${returnContent}}`;
}

function responseFill(content){
    var element = content.element;
    var fillText = content.fillText;
    var nodeById = domCurrent.getElementById(element);
    var nodeByName = domCurrent.getElementsByName(element);
    //按id可以找到
    if(nodeById){
        //INPUT text
        if(nodeById.tagName == "INPUT" && nodeById.type.toUpperCase() == "TEXT"){
            nodeById.value = fillText;
            returnCode = "S000";
            returnContent = `${element}文本元素填充成功`;
        }
        //SELECT option
        if(nodeById.tagName == "SELECT"){
            var options = nodeById.children;
            for(option in options){
                if(option.tagName == "OPTION" && option.innerText == fillText){
                    option.setAttribute("checked",true)
                    returnCode = "S000";
                    returnContent = `${element}下拉元素勾选成功`;
                }
            }
            if(returnCode == ""){
                returnCode = "W004"
                returnContent = `${element}下拉元素无匹配项`;
            }
        }
        return `{"returnCode":"${returnCode}","returnContent":${returnContent}}`;
    }
    //按name没有找到
    if(nodeByName.length < 1){
        returnCode = "W003"

        return element+"元素未找到";
    }
    if(nodeByName[0].tagName == "INPUT" && nodeByName[0].type.toUpperCase() == "TEXT"){
        nodeByName[0].value = fillText;
        return element+"文本元素已填充";
    }
    //INPUT radio
    // 只支持按value选址，这块不太好
    if(nodeByName[0].tagName == "INPUT" && nodeByName[0].type.toUpperCase() == "RADIO"){
       for(radio in nodeByName){
           if(radio.value == fillText){
               radio.setAttribute("checked","true");
               result = element+"单选元素已填充";
           }
       }
       if(result == ""){
            result = element+"单选元素未匹配";
        }
        return result;
    }
    if(nodeByName[0].tagName == "INPUT" && nodeByName[0].type.toUpperCase() == "CHECKBOX"){
        //TODO
        fillTexts = fillText.split(",");
        for(radio in nodeByName){
            if(fillTexts.indexOf(radio.value) != -1){
                radio.setAttribute("checked","true");
                result = element+"单选元素已填充";
            }
        }
        if(result == ""){
             result = element+"单选元素未匹配";
         }
         return result;
    }
    //SELECT
    if(nodeByName[0].tagName == "SELECT"){
        var options = nodeById.children;
        for(option in options){
            if(option.tagName == "OPTION" && option.innerText == fillText){
                option.setAttribute("checked",true)
                result = element+"下拉元素已填充";
            }
        }
        if(result == ""){
            result = element+"下拉元素未匹配";
        }
        return result;
    }
    
    return result;
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    switch(request.action){
        case "init":
            result = responseInit();
            sendResponse(result);
            break;
        case "change":
            request = responseChange(request.content);
            sendResponse(result);
            break;
        case "fill":
            result = responseFill(request.content);
            sendResponse(result);
            break;
        default:
            sendResponse("");
    }
    
});