//txt文件格式验证

var itemOne   = ["id","name","others"];
var itemTwo;
var itemThree = ["text","select","radio","checkbox","others"];
var itemFour  = ["text","value","others"];
var itemFive;


function fileValidText(file){
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
        validTextFormat(contentArray);
    }
    read.onerror = function(){
        //TODO 文件读取异常
    }
    read.onprogress = function(){
        //TODO 文件读取中
    }
}

function validTextFormat(contentArray){
    var seekResult;
    for(var i = 0; i < contentArray.length; i ++){
        arrItem = contentArray[i].trim().split(/\s+/);
        //每行元素共有5至6列
        if(arrItem.length > 6 || arrItem < 5){
            //TODO 总列数数目不对
            return false;
        }
        //第一列校验
        if(arrItem[0] && itemOne.indexOf(arrItem[0].trim()) != -1){
            console.log("第一列校验通过")
        }else{
            //TODO 第一列校验失败
            return false;
        }
        //第二列校验
        if(arrItem[1] && arrItem[1].trim() != ""){
            seekResult = send("valid",{"seekType":arrItem[0],"elementName":arrItem[1]});
            if(!seekResult.found){
                //TODO 未找到对应元素
                return false;
            }
        }else{
            //TODO 第二列校验失败
            return false;
        }
        //第三列校验
        if(arrItem[2] && itemThree.indexOf(arrItem[2].trim()) != -1){
            //根据第二列所寻元素类型进行比较
        }else{
            //TODO 第三列校验失败
            return false;
        }
        //第四列校验
        if(arrItem[3] && itemFour.indexOf(arrItem[3].trim()) != -1){
            //TODO 按照约束条件进行进一步校验
        }else{
            //TODO 第四列校验失败
            return false;
        }
        if(arrItem[4] && arrItem[1].trim() != ""){
            //TODO 根据约束做进一步校验
        }else{
            //TODO 第五列校验失败
            return false;
        }
    }
}

function seekElement(type,name){
    var content = {"seekType":type,"elementName":name};
    return send("valid",content);
}