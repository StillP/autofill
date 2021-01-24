//frame及iframe处理，后续写入cookie
var iframes = document.getElementsByTagName("iframe");
var frames  = document.getElementsByTagName("frame");
var frameLen = frames.length;
var iframeLen = iframes.length;
var documentColor;
var domCurrent;
function responseInit(){
    var returnCode = "S001";
    var returnContent = "{\"framesLength\":\""+frameLen+"\",\"iframesLength\":\""+iframeLen+"\"}";
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
            }catch(error){
                console.log(error);
                //TODO frame跨域问题
            }
        }else{
            try{
                domCurrent = iframes[parseInt(arrFrame[1])].contentWindow.document;
            }catch(error){
                console.log(error);
                //TODO iframe跨域问题
            }
        }
        documentColor = domCurrent.body.style.backgroundColor;
        domCurrent.body.style.backgroundColor = "green";
        setTimeout("domCurrent.body.style.backgroundColor = documentColor",200);
    }
    return "";
}

function responseValid(content){
    var result = "";
    var element = content.element;
    var fillText = content.fillText;
    var nodeById = domCurrent.getElementById(element);
    var nodeByName = domCurrent.getElementsByName(element);
    //按id可以找到
    if(nodeById){
        //INPUT text
        if(nodeById.tagName == "INPUT" && nodeById.type.toUpperCase() == "TEXT"){
            nodeById.value = fillText;
            return element+"文本元素已填充";
        }
        //SELECT option
        if(nodeById.tagName == "SELECT"){
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
    }
    //按name没有找到
    if(nodeByName.length < 1){
        return element+"元素未找到";
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