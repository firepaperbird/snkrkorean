/**
 * Created by ngocnt on 3/3/2018.
 */

var pageSize = 12;
var currentPage = 1;
var maxNumberOfPageShow = 7;

$(document).ready(function () {
    AddListenerForMenu();
    currentPage = 1;

    var id = getUrlVars()["cid"];
    var subid = getUrlVars()["subid"];
    if(subid!=null && subid != 'undefined'){
        id = subid;
    }
    GetCategories(id);
    controller(id,0);
    $('.custom-select').change(function(){
        var sr = $('.custom-select').val();
        controller(id,sr);
    });

    $('.deal-menu li').click(function(e){
        window.location.href='products.html?cid='+$(this).attr('value');

    })
});

function controller(id, sr){
    if (id!=null & id > 0){
            GetProductByCategory(id,sr);//chua sort
    }else{
        if(id==0 || id == null){
            GetAllProduct(sr);
        }
        if(id == -1){
            getDealingPro(sr);
        }   
        if(id == -2){
            getUpcomingPro(sr);
        }   
        if(id == -3){
            var str = getUrlVars()["search"];
            showSearch(str);
        }          
    }

}

function GetAllProduct(sort){
    var dataJSON ={
        sortByPrice:sort, //1= low to high
        sortById:0
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "product",
        dataType:'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    var productList = request.done(function (data) {
        window.localStorage.setItem('list-product',JSON.stringify(data));
        createPagingLink();
        //CreateListItem(data);
        createFrameItem();
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}



function  CreateListItem(products) {
    var list = $("#list-item-product");
    list.empty();
    products.forEach(function (product,index) {
        // console.log(product);
        list.append(CreateItemProduct(product));
    });
}

function CreateItemProduct(product) {
    // console.log(product.ProductId);
    var item = $("<div class='item' id='"+product.ProductId+"' onclick='GoToDetailPage("+product.ProductId+")'></div>");
    var itemImage = CreateImage(product.Url,product.Name);
    var description = $('<div class="item-description"></div>');
    var itemName = $('<p class="item-name"></p>');
    itemName.append(product.Name);
    var divPrice = $('<div></div>');
    var currentPice = $('<span class="price"></span>');
    var price = (product.Type == false)? (product.Price*(1-product.Discount/100)):(product.Price-product.Discount);
    currentPice.append(currency + price);

    divPrice.append(currentPice);
    if (product.Discount != 0){
        var deletedPrice=$('<span class="delete-price"></span>');
        deletedPrice.append(currency + product.Price);
        divPrice.append(deletedPrice);
    }

    description.append(itemName);
    description.append(divPrice);
    item.append(itemImage);
    item.append(description);
    return item;


}
function CreateImage(src, name) {
    var itemImage = $('<div class="item-image"></div>');
    var image = $("<img/>");
    if (src === ''){
        src = 'img/No_Image_Available.jpg';
    }
    image.attr('src',src);
    image.attr('alt',name);
    itemImage.append(image);
    return itemImage;
}

function GoToDetailPage(productID) {
    console.log(productID);
    window.location.replace("detail.html?id="+productID);
    console.log(productID);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function GetProductByCategory(cate,sort){
    var dataJSON ={
        categoryId:cate, 
        sortByPrice:sort
    };
    // alert(cate);
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "product/get/category",
        dataType:'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        window.localStorage.setItem('list-product',JSON.stringify(data));
        createPagingLink();
        //CreateListItem(data);
        createFrameItem();
        editCateName(cate);
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}
function editCateName(cate){
    var cateName = $('#categories #'+cate).text();
    $('.category-title').empty();
    $('.category-title').append('<p>'+cateName+'</p>');
    $('.category-description').empty();
    $('.category-description').append('<p>'+categoryDes.find(x => x.id == cate).des+'</p>');
}

function getDealingPro(sort){
    var dataJSON ={
        sortByPrice:sort, //1= low to high
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "product/dealing",
        dataType:'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        window.localStorage.setItem('list-product',JSON.stringify(data));
        createPagingLink();
        //CreateListItem(data);
        createFrameItem();
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}

function getUpcomingPro(sort){
    var dataJSON ={
        sortByPrice:sort, //1= low to high
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "product/upcomming",
        dataType:'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        window.localStorage.setItem('list-product',JSON.stringify(data));
        createPagingLink();
        //CreateListItem(data);
        createFrameItem();
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}
function showSearch(str){
    var dataJSON ={
        searchString:str, 
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "product/search",
        dataType:'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        //console.log(data);
        CreateListItem(data);
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}

function createPagingLink(){
    jQuery("#paging").empty();
    var productList = JSON.parse(window.localStorage.getItem('list-product'));
    var amountPage = (productList.length - 1)/pageSize + 1;
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
    createFrameItem();
    createPagingLink();
}

function createFrameItem(){
    var listProduct = JSON.parse(window.localStorage.getItem('list-product'));
    listProduct = listProduct.slice((currentPage-1)*pageSize,currentPage*pageSize);
    CreateListItem(listProduct);
}