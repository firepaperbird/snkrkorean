var pageSize = 5;
var currentPage = 1;
var maxNumberOfPageShow = 7;

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
        window.localStorage.setItem('list-blog',JSON.stringify(data));
        createPagingLink();
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
    list.empty();
    var blogList = JSON.parse(window.localStorage.getItem('list-blog'));
    list.append(CreateTopPost(blogList[0]));
    var far = $('<div class="below-posts"></div>');
    list.append(far);
    CreateBelowPost(blogList[1],1);
    CreateBelowPost(blogList[2],2);
    $(".below-posts").append('<div style="clear: both;"></div>');

    blogList = blogList.slice((currentPage-1)*pageSize + 3,currentPage*pageSize + 3);

    blogList.forEach(function (item,index) {
        // // console.log(item);
        // switch(index){
        //     case 0:
        //         list.append(CreateTopPost(item));
        //         break;
        //     case 1:
                // var far = $('<div class="below-posts"></div>');
                // list.append(far);
                // CreateBelowPost(item,1);
        //         break;
        //     case 2:
                // CreateBelowPost(item,2);
                // $(".below-posts").append('<div style="clear: both;"></div>');
        //         break;
        //     default:
                list.append(CreateItemPost(item));
        // }
        
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
    description.append($(pst.Content).text().substring(0,150)+'...');
    content.append(description);
    var readmoreLink = $('<div class="link-readmore"><a href="blog-detail.html?id='+pst.Id+'">R E A D M O R E</a></div>');
    content.append(readmoreLink);
    // item.append(thepostoutline);
    item.append(content);
    item.on('click',function(){
        location.href = 'blog-detail.html?id='+pst.Id;
    })
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
    description.append($(pst.Content).text().substring(0,150)+'...');
    content.append(description);
    var readmoreLink = $('<div class="link-readmore"><a href="blog-detail.html?id='+pst.Id+'">R E A D M O R E</a></div>');
    content.append(readmoreLink);
    leftRight.append(content);
    item.append(leftRight);
    item.on('click',function(){
        location.href = 'blog-detail.html?id='+pst.Id;
    })
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
    description.append($(pst.Content).text().substring(0,150)+'...');
    content.append(description);
    var readmoreLink = $('<div class="link-readmore"><a href="blog-detail.html?id='+pst.Id+'">R E A D M O R E</a></div>');
    content.append(readmoreLink);
    item.append(itemImage);
    item.append(content);
    item.on('click',function(){
        location.href = 'blog-detail.html?id='+pst.Id;
    })
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

function createPagingLink(){
    jQuery("#paging").empty();
    var blogList = JSON.parse(window.localStorage.getItem('list-blog'));
    jQuery("#paging").empty();
    var amountPage = (blogList.length - 4)/pageSize + 1;
    if (amountPage <= maxNumberOfPageShow){
        for (var i = 1; i <= amountPage; i++) {
            jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+i+')">'+i+'</a>'));
        }
    }else{

        if (currentPage <= 4){
            for (var i = 1; i <= 6; i++) {
                jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+i+')">'+i+'</a>'));
            }
            jQuery("#paging").append(jQuery('<a href="#"">...</a>'));
            jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+amountPage+')">'+amountPage+'</a>'));
        }else if (currentPage > 4 && currentPage < amountPage - 4){
            jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+1+')">'+1+'</a>'));
            jQuery("#paging").append(jQuery('<a href="#"">...</a>'));
            for (var i = currentPage - 2; i <= currentPage + 2; i++) {
                jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+i+')">'+i+'</a>'));
            }
            jQuery("#paging").append(jQuery('<a href="#"">...</a>'));
            jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+amountPage+')">'+amountPage+'</a>'));

        }else {
            jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+1+')">'+1+'</a>'));
            jQuery("#paging").append(jQuery('<a href="#"">...</a>'));
            for (var i = amountPage - 5; i <= amountPage; i++) {
                jQuery("#paging").append(jQuery('<a href="#" onclick="setCurrentPage('+i+')">'+i+'</a>'));
            }
        }
    }
}

function setCurrentPage(page){
    currentPage = page;
    CreateListItem();
    createPagingLink();
}

function createFrameItem(){
    var blogList = JSON.parse(window.localStorage.getItem('list-blog'));
    blogList = blogList.slice((currentPage-1)*pageSize,currentPage*pageSize);
    CreateListItem(blogList);
}