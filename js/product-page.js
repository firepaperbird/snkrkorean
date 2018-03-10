/**
 * Created by ngocnt on 3/3/2018.
 */
$(document).ready(function () {
    AddListenerForMenu();
    GetAllProduct();
})



function GetAllProduct(){
    var dataJSON ={
        sortByPrice:-1, //sort from newest to oldest
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
    products.forEach(function (product,index) {
        console.log(product);
        list.append(CreateItemProduct(product));
    });
}

function CreateItemProduct(product) {
    console.log(product.ProductId);
    var item = $("<div class='item' id='"+product.ProductId+"' onclick='GoToDetailPage("+product.ProductId+")'></div>");
    var itemImage = CreateImage(product.Url,product.Name);
    var description = $('<div class="item-description"></div>');
    var itemName = $('<p class="item-name"></p>');
    itemName.append(product.Name);
    var divPrice = $('<div></div>');
    var currentPice = $('<span class="price"></span>');
    var price = (product.Type == false)? (product.Price*(1-product.Discount/100)):(product.Price-product.Discount);
    currentPice.append(price + "đ   ");

    divPrice.append(currentPice);
    if (product.Discount != 0){
        var deletedPrice=$('<span class="delete-price"></span>');
        deletedPrice.append(product.Price + "đ   ");
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