//frame及iframe处理，后续写入cookie
var iframes = document.getElementsByTagName("iframe");
var frames  = document.getElementsByTagName("frame");
var frameLen = frames.length;
var iframeLen = iframes.length;

var documentColor;
// var returnObject;
// var returnCode;
// var returnInformation;
// var returnContent;

function responseInit(){
    var returnCode = "S001";
    var returnContent = "{\"framesLength\":\""+frameLen+"\",\"iframesLength\":\""+iframeLen+"\"}";
    return "{\"returnCode\":\""+returnCode+"\",\"returnContent\":"+returnContent+"}";
}

function responseMouseOver(frame){
    if(frame == "top"){
        documentColor = document.body.style.backgroundColor;
        document.body.style.backgroundColor = "green";
    }
    return "";
}

function responseMouseOut(frame){
    if(frame == "top"){
        document.body.style.backgroundColor = documentColor;
    }
    return "";
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    switch(request.action){
        case "init":
            result = responseInit();
            sendResponse(result);
            break;
        case "mouseOver":
            request = responseMouseOver(request.content);
            sendResponse(result);
            break;
        case "mouseOut":
            result = responseMouseOut(request.content);
            sendResponse(result);
            break;
        default:
            sendResponse("");
    }
    
});