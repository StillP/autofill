//frame及iframe处理，后续写入cookie
var iframes = document.getElementsByTagName("iframe");
var frames  = document.getElementsByTagName("frame");
var frameLen = frames.length;
var iframeLen = iframes.length;
// var returnObject;
// var returnCode;
// var returnInformation;
// var returnContent;

function responseInit(){
    var returnCode = "S001";
    var returnContent = "{\"framesLength\":\""+frameLen+"\",\"iframesLength\":\""+iframeLen+"\"}";
    return "{\"returnCode\":\""+returnCode+"\",\"returnContent\":"+returnContent+"}";
}

// function responseLevel(){

// }


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    result = responseInit();
    sendResponse(result);
});