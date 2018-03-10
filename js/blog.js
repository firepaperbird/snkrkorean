$(document).ready(function () {
    GetAllProduct();
});

function GetAllProduct(){
    var dataJSON ={
        sortTime:-1, //sort from newest to oldest
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "post/all",
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

function  CreateListItem(postlist) {
    var list = $("#container");
    postlist.forEach(function (item,index) {
        console.log(item);
        switch(index){
            case 1:

                break;
            case 2:
                
                break;
            case 3:
                
                break;
            default:
                list.append(CreateItemPost(item));
        }
        
    });
}

function CreateItemPost(pst) {
    // console.log(pst.ProductId);
    // var item = $("<div class='item' id='"+pst.ProductId+"' onclick='GoToDetailPage("+pst.ProductId+")'></div>");
    // var itemImage = CreateImage(pst.Url,pst.Name);
    // var description = $('<div class="item-description"></div>');
    // var itemName = $('<p class="item-name"></p>');
    // itemName.append(pst.Name);
    // var divPrice = $('<div></div>');
    // var currentPice = $('<span class="price"></span>');
    // var price = (pst.Type == false)? (pst.Price*(1-pst.Discount/100)):(pst.Price-pst.Discount);
    // currentPice.append(price + "đ   ");

    // divPrice.append(currentPice);
    // if (pst.Discount != 0){
    //     var deletedPrice=$('<span class="delete-price"></span>');
    //     deletedPrice.append(pst.Price + "đ   ");
    //     divPrice.append(deletedPrice);
    // }

    // description.append(itemName);
    // description.append(divPrice);
    // item.append(itemImage);
    // item.append(description);
    // return item;

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