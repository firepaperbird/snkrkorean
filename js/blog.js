$(document).ready(function () {
    GetAllPost();
});

function GetAllPost(){
    var dataJSON ={
        sortTime:-1, //sort from newest to oldest
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "/post/all",
        dataType:'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        // console.log(data);
        if(data!=null){
            CreateListItem(data);
        }
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}

function  CreateListItem(postlist) {
    var list = $("#container");
    postlist.forEach(function (item,index) {
        // console.log(item);
        switch(index){
            case 0:
                list.append(CreateTopPost(item));
                break;
            case 1:
                var far = $('<div class="below-posts"></div>');
                list.append(far);
                CreateBelowPost(item,1);
                break;
            case 2:
                CreateBelowPost(item,2);
                $(".below-posts").append('<div style="clear: both;"></div>');
                break;
            default:
                list.append(CreateItemPost(item));
        }
        
    });
    // fix container height bug
    var x = $('<div style="clear: both;"></div>');
    list.append(x);
}

function CreateTopPost(pst) {
    var item = $('<div class="top-post thepost"></div>');
    // item.style.background=' url(https://snkrvn.com/wp-content/uploads/2018/03/hender-scheme-adidas-originals-spring-summer-2018-campaign-001-1020x685.jpg) no-repeat scroll 50% 0%';
    // var itemImage = CreateImage(pst.Image,pst.Title); 
    item.css('background','url('+pst.Image+') no-repeat scroll 50% 0%');
    item.css('background-size','cover');
    // var thepostoutline = $('<div class="top-post thepost"></div>');
    var content = $('<div class="post-content"></div>');
    var title = $('<h3></h3>');    
    title.append(pst.Title);    
    content.append(title);
    var description = $('<div class="post-description"></div>');
    description.append($(pst.Content.substring(0,150)).text()+'...');
    content.append(description);
    var readmoreLink = $('<div class="link-readmore"><a href="blog-detail.html?id='+pst.Id+'">R E A D M O R E</a></div>');
    content.append(readmoreLink);
    // item.append(thepostoutline);
    item.append(content);
    return item;
}
function CreateBelowPost(pst,pos) {
    var item = $(".below-posts");
    var leftRight;
    if(pos===1){
         leftRight = $('<div class="left-below"></div>');
    }else{
        leftRight= $('<div class="right-below"></div>');
    }
    leftRight.css('background','url('+pst.Image+') no-repeat scroll 0% 0%');
    leftRight.css('background-size','cover');
    var content = $('<div class="post-content"></div>');
    var title = $('<h3></h3>')
    title.append(pst.Title);    
    content.append(title);
    var description = $('<div class="post-description"></div>');
    description.append($(pst.Content.substring(0,150)).text()+'...');
    content.append(description);
    var readmoreLink = $('<div class="link-readmore"><a href="blog-detail.html?id='+pst.Id+'">R E A D M O R E</a></div>');
    content.append(readmoreLink);
    leftRight.append(content);
    item.append(leftRight);
    return item;
}

function CreateItemPost(pst) {
    var item = $('<div class="normal-posts"></div>');
    var itemImage = CreateImage(pst.Image,pst.Title); 
    var content = $('<div class="post-content"></div>');
    var title = $('<h3></h3>');    
    title.append(pst.Title);    
    content.append(title);
    var description = $('<div class="post-description"></div>');
    description.append($(pst.Content.substring(0,150)).text()+'...');
    content.append(description);
    var readmoreLink = $('<div class="link-readmore"><a href="blog-detail.html?id='+pst.Id+'">R E A D M O R E</a></div>');
    content.append(readmoreLink);
    item.append(itemImage);
    item.append(content);
    return item;
}
function CreateImage(src, name) {
    // var itemImage = $('<div class="item-image"></div>');
    var image = $("<img/>");
    if (src === ''){
        src = 'img/No_Image_Available.jpg';
    }
    image.attr('src',src);
    image.attr('alt',name);
    return image;
}