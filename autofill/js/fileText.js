//txt文件格式验证
/* 
    name/id     content
*/

function fileFillText(file){
    var read = new FileReader();
    read.readAsText(file,'text/plain;charset=UTF-8');
    read.onload = function(event){
        //成功读取
        contentArray = event.target.result.split(/[(\r\n)\r\n]+/);
        contentArray.forEach((item,index) =>{
            if(!item) contentArray.splice(index,1);
        });
        fillContent(contentArray);
    }
    read.onerror = function(){
        //文件读取异常
        dealResult("W007","文件读取异常");
    }
    read.onprogress = function(){
        //文件读取中
        dealResult("S001","文件读取中，请稍后");
    }
}

function fillContent(contentArray){
    for(var i = 0; i < contentArray.length; i ++){
        arrItem = contentArray[i].trim().split(/\s+/);
        if(!arrItem[0] || arrItem[0].trim() == ""){
            dealResult("W006","元素标识为空")
        }
        if(!arrItem[1]){
            arrItem[1] = "";
        }
        send("fill",{"element":arrItem[0],"fillText":arrItem[1]});
    }
}
