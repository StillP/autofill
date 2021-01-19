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
    //处理id与name同名问题
    if(!nodeById){
        fillById(nodeById,fillText);
    }
    if(nodeByName.length > 0){
        fillByName(nodeByName,fillText);
    }
    return result;
}

function fillById(node,content){
    //TODO
}

function fillByName(nodes,content){
    //TODO
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