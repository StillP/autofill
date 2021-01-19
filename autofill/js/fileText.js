//txt文件格式验证
/* 
    name/id     content
*/

function fileFillText(file){
    var fileFillResult = false;
    var read = new FileReader();
    read.readAsText(file,'text/plain;charset=UTF-8');
    read.onload = function(event){
        //成功读取
        contentArray = event.target.result.split(/[(\r\n)\r\n]+/);
        contentArray.forEach((item,index) =>{
            if(!item){
                contentArray.splice(index,1);
            }
        });
        fileFillResult = fillContent(contentArray);
    }
    read.onerror = function(){
        //TODO 文件读取异常
    }
    read.onprogress = function(){
        //TODO 文件读取中
    }
}

function fillContent(contentArray){
    var fillResult = false;
    for(var i = 0; i < contentArray.length; i ++){
        arrItem = contentArray[i].trim().split(/\s+/);
        if(!arrItem[0] || arrItem[0].trim() == ""){
            return false;
        }
        if(!arrItem[1] || arrItem[1].trim() == ""){
            return false;
        }
        fillResult = send("fill",{"element":arrItem[0],"fillText":arrItem[1]});
    }
    return fillResult;
}
