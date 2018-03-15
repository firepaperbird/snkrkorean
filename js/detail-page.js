/**
 * Created by ngocnt on 3/10/2018.
 */

$(document).ready(function () {
    AddListenerForMenu();
    GetCategories();
    var id = getUrlVars()["id"];
    if (id == null){
        window.location.replace('products.html');
    }
    GetProductDetail(getUrlVars()["id"]);
    moveCategory();
});

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function GetProductDetail(id) {
    var request = jQuery.ajax({
        type:"GET",
        url:HOST + "product/"+id
    });
    request.done(function (data) {
        console.log(data);
        CreateProduct(data);
    });
    request.fail(function (data) {
        console.log("fail");
    })
}

function CreateProduct(item){
    // product image
    if (item.Images == null){
        jQuery('.item-image-big img').attr('src','img/No_Image_Available.jpg');
    }else{
        item.Images.forEach(function (image,index) {
            if (index == 0){
                jQuery('.item-image-big img').attr('src',image.Url);
            }
            jQuery('.item-image-small').append(CreateImage(image.Url));
        });
    }


    //product info
    jQuery('.item-name').append(item.Name);
    jQuery('.item-id').append('ID: ' + item.ProductId);
    if (item.Discount == 0){
        jQuery('.item-price-current').append(item.Price);
        jQuery('.item-price-delete').css('display','none');
    }else{
        if (item.Type == true){
            jQuery('.item-price-current').append((item.Price - item.Discount));
            jQuery('.item-price-current').append("đ");
            jQuery('.item-price-delete').append(item.Price);
        }else{
            jQuery('.item-price-current').append(item.Price*(1 - item.Discount/100));
            jQuery('.item-price-current').append("đ");
            jQuery('.item-price-delete').append(item.Price);
        }
    }
    console.log(item);
    if (item.Sizes != null){
        item.Sizes.forEach(function (size,index) {
            if (index == 0){
                jQuery('.list-size').append(CreateSizeSelected(size.Id,size.Name));
            }else{
                jQuery('.list-size').append(CreateSizeItem(size.Id,size.Name));

            }
        });
    }

    jQuery('.product-description-content').append(item.Description);
    //add other detail of product
    jQuery('.list-product-detail').append(CreateRowInDetail('Brand',item.Brand));
    jQuery('.list-product-detail').append(CreateRowInDetail('Country',item.Country));
    jQuery('.list-product-detail').append(CreateRowInDetail('Material',item.Material));
    if (item.Quantity == 0){
        jQuery('.btn-add-cart').attr('value','Sold out');
        jQuery('.btn-add-cart').attr('disabled','disabled');
    }
}

function CreateImage(src){
    var imageDiv = jQuery('<div class="image"></div>');
    var image = jQuery('<img/>');
    image.attr('src',src);
    imageDiv.append(image);
    return imageDiv;
}

function CreateSizeItem(id, value){
    var itemSize =  jQuery('<span class="size-item" id="'+id+'"></span>');
    itemSize.append(value);
    return itemSize;
}

function CreateSizeSelected(id,value){
    var itemSize = CreateSizeItem(id,value);
    itemSize.add('class','size-slected');
    return itemSize;
}

function CreateRowInDetail(name,value) {
    var row = jQuery('<li></li>');
    row.append(name + ': ' + value)
    return row;
}

var storedAry;
$( ".btn-add-cart" ).click(function() {
    var cookieValue = getCookie("snkrcrt");
    var dataJSON = {
                        id: getUrlVars()["id"],
                        quantity: $('.custom-select :selected').text(),
                        size: $('.size-slected').text()
                    }
    if(cookieValue.length!=0){
        storedAry = JSON.parse(cookieValue);        
        additem(dataJSON);
    }else{
        storedAry=[dataJSON];
    }
    setCookie("snkrcrt",JSON.stringify(storedAry),1);
    toastr.success("add to cart success");
    // alert( "add success ID: "+ getUrlVars()["id"])
});

function additem(item){
    for (var i = 0; i < storedAry.length; i++) {
        if(storedAry[i].id == item.id){
            storedAry[i].quantity=0+ (+storedAry[i].quantity)+(+item.quantity);
            // alert( "array length: "+ storedAry.length);
            return;
        }
    }
    storedAry.push(item);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// move category to bottom off web when sm device
function moveCategory(){
    if($('body').width() < 989){
        $('#category').each(function() {
            $(this).insertAfter($(this).parent().find('.item'));
        });
    }
}

