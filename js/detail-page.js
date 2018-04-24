/**
 * Created by ngocnt on 3/10/2018.
 */

$(document).ready(function () {
    var id = getUrlVars()["id"];
    if (id == null) {
        window.location.replace('products.html');
    }
    AddListenerForMenu();
    GetCategories();
    GetProductDetail(id);
    GetProductComment(id)
    moveCategory();

    $('.list-size').on('click','.size-item', function (e) {
        $('.size-item').removeClass('size-slected');
         //apply jQuery's stop() method here 
        $(this).addClass('size-slected');

    });
    $('.item-image-big img').on('click', function(){
        zoomImg();
    });

});
var gobalPrice
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

function GetProductDetail(id) {
    var request = jQuery.ajax({
        type: "GET",
        url: HOST + "product/" + id
    });
    request.done(function (data) {
        console.log(data);
        CreateProduct(data);
    });
    request.fail(function (data) {
        console.log("fail");
    })
}

function CreateProduct(item) {
    // product image
    if (item.Images == null) {
        jQuery('.item-image-big img').attr('src', 'img/No_Image_Available.jpg');
    } else {
        item.Images.forEach(function (image, index) {
            if (index == 0) {
                jQuery('.item-image-big img').attr('src', image.Url);
            }
            var smallImage =CreateImage(image.Url);
            smallImage.on('click',function(e){
                    jQuery('.item-image-big img').attr('src', image.Url);
                });
            
            jQuery('.item-image-small').append(smallImage);
        });
    }


    //product info
    jQuery('.item-name').append(item.Name);
    jQuery('.item-id').append('ID: ' + item.ProductId);
    if (item.Discount == 0) {
        gobalPrice=item.Price;
        jQuery('.item-price-current').append(currency);
        jQuery('.item-price-current').append(gobalPrice);
        jQuery('.item-price-delete').css('display', 'none');
    } else {
        if (item.Type == true) {
            gobalPrice=(item.Price - item.Discount);            
            jQuery('.item-price-current').append(currency);
            jQuery('.item-price-current').append(gobalPrice);
            jQuery('.item-price-delete').append(item.Price);
        } else {
            gobalPrice=item.Price * (1 - item.Discount / 100);
            jQuery('.item-price-current').append(currency);
            jQuery('.item-price-current').append(gobalPrice);
            jQuery('.item-price-delete').append(item.Price);
        }
    }
    if (item.Sizes != null) {
        item.Sizes.forEach(function (size, index) {
            // console.log(index);
            if (index == 0) {
                jQuery('.list-size').append(CreateSizeSelected(size.Id, size.Name));
            } else {
                jQuery('.list-size').append(CreateSizeItem(size.Id, size.Name));

            }
        });
    }

    jQuery('.product-description-content').append(item.Description);
    //add other detail of product
    jQuery('.list-product-detail').append(CreateRowInDetail('Brand', item.Brand));
    jQuery('.list-product-detail').append(CreateRowInDetail('Country', item.Country));
    jQuery('.list-product-detail').append(CreateRowInDetail('Material', item.Material));
    if (item.Quantity == 0) {
        jQuery('.btn-add-cart').attr('value', 'Sold out');
        jQuery('.btn-add-cart').attr('disabled', 'disabled');
    }
}

function CreateImage(src) {
    var imageDiv = jQuery('<div class="image"></div>');
    var image = jQuery('<img/>');
    image.attr('src', src);
    imageDiv.append(image);
    return imageDiv;
}

function CreateSizeItem(id, value) {
    var itemSize = jQuery('<span class="size-item" id="' + id + '"></span>');
    itemSize.append(value);
    return itemSize;
}

function CreateSizeSelected(id, value) {
    var itemSize = CreateSizeItem(id, value);
    itemSize.addClass('size-slected');
    return itemSize;
}

function CreateRowInDetail(name, value) {
    var row = jQuery('<li></li>');
    row.append(name + ': ' + value)
    return row;
}

function GetProductComment(id) {
    var dataJSON = {
        sortByTime: -1,
        ProductId: id
    };
    var request = jQuery.ajax({
        type: "GET",
        url: HOST + "comment/inproduct",
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        CreateListComment(data);
    });
    request.fail(function (data) {
        console.log("fail");
    })
    //
    var tmp = sessionStorage.getItem('customer');
    if(tmp!=null || tmp!=undefined){
        $('.input-comment-author').text(JSON.parse(tmp).name);
    }
}

function CreateListComment(comments){
    var listComments = jQuery('.list-comment');
    comments.forEach(function (comment,index) {
        listComments.append(CreateComment(comment));
    })
}

function CreateComment(comment){
    console.log(comment);
    var div = jQuery('<div class="comment"></div>');
    var author = jQuery('<p class="author-name"></p>');
    author.append(comment.AuthorId);
    var content = jQuery('<p class="comment-content"></p>');
    content.append(comment.Content);
    div.append(author);
    div.append(content);
    return div;
}

//add to  cart btn
var storedAry;
$( ".btn-add-cart" ).click(function() {
    if (!$('.list-size').children().has('.size-slected')){
        toastr.warning('Please choose size of product');
        return;
    }
    // var cookieValue = getCookie("snkrcrt");
    storedAry = JSON.parse(localStorage.getItem('cartlist'));
    var item = {
                        id: getUrlVars()["id"],
                        quantity: $('.custom-select :selected').text(),
                        size: $('.size-slected').text(),
                        lastPrice: gobalPrice//gobalitem.Price
                    }
    if(storedAry!=null && storedAry.length > 0){ 
        additem(item);
    }else{
        storedAry=[item];
    }
    // setCookie("snkrcrt",JSON.stringify(storedAry),1);
    localStorage.setItem('cartlist', JSON.stringify(storedAry));
    toastr.success("add to cart success");
    $('.user-cart').text('Cart ('+storedAry.length+')');
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

// move category to bottom off web when sm device
function moveCategory() {
    if ($('body').width() < 989) {
        $('#category').each(function () {
            $(this).insertAfter($(this).parent().find('.item'));
        });
    }
}
function submitcmnt(){
    if (!checklogin()){
        toastr.error("Please login before comment!");
        return;
    }

    var cmntPack = {
        proId: getUrlVars()["id"],
        username:JSON.parse(sessionStorage.getItem('customer')).id,
        title:'',
        content:$('#input-comment-content').val(),
        token:getCookie("token")
    };
    var request = jQuery.ajax({
        type: "POST",
        url: HOST + "comment/add",
        dataType:'json',
        data:cmntPack,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        location.reload();
    });
    request.fail(function (data) {
        toastr.error("Comment fail!");
    })
}

function checklogin(){
    var username=JSON.parse(sessionStorage.getItem('customer')).id;
    if (username!=null && username!="")
        return true;
    else
        return false;
}
function zoomImg(){

    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    // img.onclick = function(){
    //     modal.style.display = "block";
    //     modalImg.src = this.src;
    //     captionText.innerHTML = this.alt;
    // }
    $('#myImg').on('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
        modal.style.display = "none";
    }
    var flag = false;
    $('.modal').on('click', function(e) {
        if (e.target !== this)
            return;
        modal.style.display = "none";
    });
}