/**
 * Created by ngocnt on 3/3/2018.
 */
$(document).ready(function () {
    AddListenerForMenu();
    var id = getUrlVars()["cid"];
    $("'#"+id+"'").attr("class","li-actived");
    GetCategories();
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
    request.done(function (data) {
        console.log(data);
        CreateListItem(data);
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
    currentPice.append(price + currency);

    divPrice.append(currentPice);
    if (product.Discount != 0){
        var deletedPrice=$('<span class="delete-price"></span>');
        deletedPrice.append(product.Price + currency);
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
        CreateListItem(data);
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
        CreateListItem(data);
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
        CreateListItem(data);
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
        console.log(data);
        CreateListItem(data);
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}