// var storedAry;
// var cookieValue = getCookie("snkrcrt");
// storedAry = JSON.parse(cookieValue); 

$(document).ready(function () {
    Getcart();
});

function Getcart(){
	var dataJSON ={
        id:[100004,100001],
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "cart/products",
        dataType:'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        console.log(data);
        CreateList(data);
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}
function  CreateList(thisItem) {
    var list = $("#left-site");
    thisItem.forEach(function (item,index) {
    	list.append(CreateItem(item));
    }
    // var imgContainer=$('<div class="img-container"></div>');
    // var img = $('<img class="top-img-cover" src="'+thisItem.Image+'"></img>');
    // imgContainer.append(img);
    // var title = $('<h1 class="title">'+thisItem.Title+'</h1>');
    // var content = $('<div class="post-content">'+thisItem.Content+'</div>');
    // var author = $('<p class="author">'+thisItem.UserId+'</p>');
    // // fix container height bug
    // list.append(imgContainer);
    // list.append(title);
    // list.append(content);
    // list.append(author);
    // var x = $('<div style="clear: both;"></div>');
    // list.append(x);
}
function CreateItem(pst) {
    var item = $('<div class="item-cart item-content"></div>');

    var imageContainer = $('<div class="item-image"></div>');
    var itemImage = CreateImage(pst.Image,pst.Name); 
    imageContainer.append(itemImage);

    var content = $('<div class="item-info"></div>');
    var name = $('<div class="item-name"><p>'+pst.Name+'</p></div>');    
    content.append(name);
    var price = $('<div class="item-price"><p>'+pst.Price+'</p></div>');
    content.append(price);

    var size = $('<div class="item-size"></div>');
    size.append($('<div class="size-title">Size</div>'));
    var sizeList = $('<div class="list-size"></div>');
    //chưa xong
    content.append(size);

    var quantity = $('<div class="item-quantity"></div>');
    quantity.append($('<div class="quantity-title">Quantity</div>'));
    var quantityInput = $('<input type="text" class="custom-select"/>');
    quantity.append(quantityInput);
    content.append(quantity);

    item.append('<div class="close-button">x</div>');
    var total = $('<div class="item-total"></div>');
    total.append('<p class="total-title">Total</p>');
    total.append('<p class="total-price">$'+calTotal(pst.Price*$('.custom-select').val())+'</p>');
    item.append(imageContainer);
    item.append(content);
    item.append(imageContainer);
    return item;
}

function CreateImage(src, name) {
    // var itemImage = $('<div class="item-image"></div>');
    var image = $("<img/>");
    if (src === ''){
        src = 'img/No_Image_Available.jpg';
    }
    image.attr('src',src[0]);
    image.attr('alt',name);
    return image;
}
function calTotal(a,b){
	return 0+(+a)*(+b);
}