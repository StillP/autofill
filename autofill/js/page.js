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
    var seekElement;
    var elementType;
    var elementFound;
    var elementOptions;
    var seekType = content.seekType;
    var elementName = content.elementName;
    if(seekType == "id"){
        seekElement = domCurrent.getElementById(elementName);
        if(seekElement){
            elementFound = true;
            if(seekElement.tagName == "INPUT"){
                elementType = "text";
                elementOptions = {"text":"text"};
            }else if(seekElement.tagName == "SELECT"){
                elementType = "select";

            }else{
                elementType = "unknown";
                elementOptions = {"error":"unknown"};
            }
        }else{
            elementFound = false;
            elementType = "unknown";
            elementOptions = {"error":"unknown"};
        }
    }else if(seekType == "name"){
        seekElement = domCurrent.getElementsByName(elementName);
        if(seekElement.length > 0){
            elementFound = true;
            if(seekElement[0] && seekElement[0].type == "radio"){
                elementType = "radio";

            }else if(seekElement[0] && seekElement[0].type == "checkbox"){
                elementType = "checkbox";

            }else{
                elementType = "unknown";
                elementOptions = {"error":"unknown"};
            }
        }
    }else{
        elementFound = false;
        elementType = "unknown";
        elementOptions = {"error":"unknown"};
    }
    return `{"found":"${elementFound}","type":"${elementType}","options":"${elementOptions}"}`
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
        case "valid":
            result = responseValid(request.content);
            sendResponse(result);
            break;
        default:
            sendResponse("");
    }
    
});