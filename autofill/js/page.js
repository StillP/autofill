//frame及iframe处理，后续写入cookie
var iframes = document.getElementsByTagName("iframe");
var frames  = document.getElementsByTagName("frame");
frames = frames.concat(iframes);
// frames.push.apply(frames,iframes);
var frameLen = frames.length;
// var returnObject;
// var returnCode;
// var returnInformation;
// var returnContent;

function responseInit(){
    var returnCode = "S001";
    var returnContent = "{\"framesLength\":\""+frameLen+"\"}";
    return "{\"returnCode\":\""+returnCode+"\",\"returnContent\":\""+returnContent+"\"}";
}

// function responseLevel(){

// }


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    responseInit();
});