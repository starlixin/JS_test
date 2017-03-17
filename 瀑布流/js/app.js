/**
 * Created by xin li on 2016/8/5.
 */
window.onload =function() {
    imgLocation("container", "box");
    var imgData=
    {"data":[{"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"},
        {"src": "5.jpg"}, {"src": "6.jpg"}]
    }
    window.onscroll = function () {
        //监听滚动条
        if (checkFlag()) {
            var cparent = document.getElementById("container");
            for (var i = 0; i < imgData.data.length; i++) {
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "images/" + imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container", "box");
        }
    }
}
function checkFlag(){
    var cparent=document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
    //console.log(lastContentHeight);
    var scrolltop = document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight||document.body.clientTop;
    //console.log(lastContentHeight+":"+scrolltop+":"+pageHeight);
    if(lastContentHeight<scrolltop+pageHeight){
        return true;
    }
}
function imgLocation(parent,content){
    //将Parent下的所有content全部取出
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    //获得每个图片的宽度，因为所有宽度相等，所以取第一个即可
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);
    //确定每排图片的个数
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto";
    //固定网页的样式，并居中
    //console.log(ccontent);
    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){
            BoxHeightArr[i]=ccontent[i].offsetHeight;
        //console.log(BoxHeightArr[i]);
         }
        else{
            var minhieght = Math.min.apply(null,BoxHeightArr);
            //找到最小高度
            var minIndex=getminheightLocation(BoxHeightArr,minhieght);
            //确定是第几个
            //console.log(minhieght);
            ccontent[i].style.position=("absolute");
            ccontent[i].style.top=minhieght+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            //确定其左边的距离，即这个图片到左边的距离；也可以用这是第几个图片去乘以宽度，但注意加上Padding
             BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
            //刷新出新的高度
        }
    }
}
function getminheightLocation(BoxheightArr,minHeight){
    //遍历盒子高度这个数组，取出最小，返回i
    for( var i in BoxheightArr){
        //遍历数组
        if(BoxheightArr[i]==minHeight){
            return i;
        }
    }
}
function getChildElement(parent,content){
    //在parent中取出全部，当名字等于content时，存入数组allcontent[],并返回数组
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for( var i=0;i<allcontent.length;i++){
         if(allcontent[i].className==content){
             contentArr.push(allcontent[i]);
         }
    }
    return contentArr
}