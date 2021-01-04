//txt文件格式验证
function fileValidText(file){
    var read = new FileReader();
    read.readAsText(file,'text/plain;charset=UTF-8');
    read.onload = function(event){
        //成功读取
        validTextFormat(event.target.result);
    }
    read.onerror = function(){
        //TODO 文件读取异常
    }
    read.onprogress = function(){
        //TODO 文件读取中
    }
}

function validTextFormat(content){
    contentArray = content.split(/[(\r\n)\r\n]+/);
    contentArray.forEach((item,index) =>{
        if(!item){
            contentArray.splice(index,1);
        }
    });
}