//frame及iframe处理，后续写入cookie
var iframes = document.getElementsByTagName("iframe");
var frames  = document.getElementsByTagName("frame");
var frameLen = frames.length;
var iframeLen = iframes.length;
var documentColor;
function responseInit(){
    var returnCode = "S001";
    var returnContent = "{\"framesLength\":\""+frameLen+"\",\"iframesLength\":\""+iframeLen+"\"}";
    return "{\"returnCode\":\""+returnCode+"\",\"returnContent\":"+returnContent+"}";
}

function responseChange(frame){
    if(frame == "top"){
        documentColor = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "green";
        setTimeout("document.body.style.backgroundColor = documentColor",200);
    }else{
        arrFrame = frame.split("_");
        console.log(arrFrame[0]);
        if(arrFrame[0] == "frame"){
            documentColor = frames[parseInt(arrFrame[1])].style.background;
            frames[parseInt(arrFrame[1])].style.background = "green";
            setTimeout("frames[parseInt(arrFrame[1])].style.background = documentColor",200);
        }else{
            documentColor = iframes[parseInt(arrFrame[1])].style.background;
            iframes[parseInt(arrFrame[1])].style.background = "green";
            setTimeout("iframes[parseInt(arrFrame[1])].style.background = documentColor",200);
        }
    }
    return "";
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
        default:
            sendResponse("");
    }
    
});