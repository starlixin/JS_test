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
        //����������
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
    //��Parent�µ�����contentȫ��ȡ��
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    //���ÿ��ͼƬ�Ŀ�ȣ���Ϊ���п����ȣ�����ȡ��һ������
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);
    //ȷ��ÿ��ͼƬ�ĸ���
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto";
    //�̶���ҳ����ʽ��������
    //console.log(ccontent);
    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<num){
            BoxHeightArr[i]=ccontent[i].offsetHeight;
        //console.log(BoxHeightArr[i]);
         }
        else{
            var minhieght = Math.min.apply(null,BoxHeightArr);
            //�ҵ���С�߶�
            var minIndex=getminheightLocation(BoxHeightArr,minhieght);
            //ȷ���ǵڼ���
            //console.log(minhieght);
            ccontent[i].style.position=("absolute");
            ccontent[i].style.top=minhieght+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            //ȷ������ߵľ��룬�����ͼƬ����ߵľ��룻Ҳ���������ǵڼ���ͼƬȥ���Կ�ȣ���ע�����Padding
             BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
            //ˢ�³��µĸ߶�
        }
    }
}
function getminheightLocation(BoxheightArr,minHeight){
    //�������Ӹ߶�������飬ȡ����С������i
    for( var i in BoxheightArr){
        //��������
        if(BoxheightArr[i]==minHeight){
            return i;
        }
    }
}
function getChildElement(parent,content){
    //��parent��ȡ��ȫ���������ֵ���contentʱ����������allcontent[],����������
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for( var i=0;i<allcontent.length;i++){
         if(allcontent[i].className==content){
             contentArr.push(allcontent[i]);
         }
    }
    return contentArr
}