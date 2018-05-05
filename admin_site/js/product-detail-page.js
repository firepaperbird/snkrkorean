/**
 * Created by ngocnt on 3/10/2018.
 */

var errorInput = 0;
var validInput=0;
var trashBin = [];
var categorSelect;

jQuery(document).ready(function () {
    var productId = window.localStorage.getItem("productId");
    window.localStorage.removeItem("productId");
    GetProduct(productId);
    
});

function GetProduct(productId) {
    var dataJson={
        token:getCookie('token')
    }
    var request = jQuery.ajax({
        type:"GET",
        url:HOST + "admin/product/"+productId,
        dataType:'json',
        data:dataJson
    });
    request.done(function (data) {
        CreateForm(data);
    });
}
var originSizes;
function CreateForm(product) {
    jQuery('#ProductId').val(product.ProductId);
    jQuery('#pro-name').val(product.Name);
    jQuery('#pro-brand').val(product.Brand);
    jQuery('#pro-price').val(product.Price);
    jQuery('#pro-country').val(product.Country);
    jQuery('#pro-description').val(product.Description);
    jQuery('#pro-marterial').val(product.Material);
    jQuery('#pro-quantity').val(product.Quantity);
    jQuery('#pro-tag').val(product.Tag);
    createSize(product.Sizes);
    GetCategories();
    jQuery('#LastModified').val(product.LastModified);
    createImg(product.Images);
    originSizes=product.Sizes;
    categorSelect=product.CategoryId;
}

function createSize(sizelist){
    var toString = '';
    if(sizelist!=null){
        sizelist.forEach(function(item){
            toString+=item.Name+', ';
        });
        jQuery('#pro-size').val(toString);
    }
    
}

function GetCategories() {
    var request=jQuery.ajax({
        type:"GET",
        url:HOST + "category/all"
    });
    request.done(function (data) {           
        CreateListCategory(data);
    });
    request.fail(function (data) {
        console.log("fail " + data);
    })
}
function CreateListCategory(categories){
    var divCategory = jQuery(".category-select");

    categories.forEach(function (category,index) {
        
        var item = CreateCategory(category.Name,category.Id);
        divCategory.append(item);
    });
}
function CreateCategory(name, categoryId) {
    var category = jQuery('<option value="'+categoryId+'">'+name+'</option>');
    if(categorSelect!=null && categorSelect==categoryId){
        category.attr("selected", true);
    }
    return category;
}
function createImg(imgList){
    var itme = jQuery('#currentImg');
    if(imgList!=null){
        imgList.forEach(function(Image,index){
            var divImage = jQuery('<div></div>');
            var imgItem = jQuery('<img src="'+Image.Url+'" id="'+Image.Id+'" class="itemImg" ondblclick="deleteImage('+Image.Id+')">');
            imgItem.on( "click", function() {
                    const index = trashBin.indexOf(Image.Id);
                    if(index<0){
                        addImgToTrash(Image.Id);
                    }else{
                        removeFromTrash(index,Image.Id);
                    }
                    //
                    console.log(trashBin);
                });
            divImage.append(imgItem);
            itme.append(divImage);
        });
    }
    
}

function addImgToTrash(id){
    //trashBin.push(id);
    jQuery('.itemImg').removeClass('trashImg');
    jQuery('#'+id).addClass('trashImg');
}
function removeFromTrash(index,imgId) {
    jQuery('#'+imgId).removeClass('trashImg');
    //trashBin.splice(index, 1);
}


function UpdateProduct() {
    if(errorInput!=0){
        alert('must enter red field (' +errorInput+ ')');
        return;
    }
    var sizeslist = jQuery('#pro-size').val().split(",");
    // sizeslist.forEach(function(si,idx){
    for (var i = 0; i < sizeslist.length; i++) {
        sizeslist[i]=jQuery.trim(sizeslist[i]);
        if(sizeslist[i]==""){
            sizeslist.splice(i, 1);
        }
    }
   
    var dataJson = {
        id: jQuery('#ProductId').val(),
        name: jQuery('#pro-name').val(),
        brand: jQuery('#pro-brand').val(),
        price: jQuery('#pro-price').val(),
        country: jQuery('#pro-country').val(),
        description: jQuery('#pro-description').val(),
        material: jQuery('#pro-marterial').val(),
        categoryId: jQuery('#pro-category').val(),
        quantity: jQuery('#pro-quantity').val(),
        tag: jQuery('#pro-tag').val(),
        images: jQuery("input[name='image']").map(function(){return jQuery(this).val();}).get(),
        sizes: sizeslist,
        isChangeSize: compareArrayOfSize(sizeslist),
        token:getCookie("token")
    };
    console.log(dataJson);
    var request = jQuery.ajax({
        type: "POST",
        url: HOST + "product/update",
        dataType: 'json',
        data: dataJson,
        header: {"Access-Control-Allow-Origin": true},
        traditional: true

    });
    request.done(function (data) {
        if (data != null) {
             DeleteImg();
            window.location.href="../admin_site/product.html";
        }
    });
    request.fail(function (data) {
        toastr.error("Update fail!")
    });

}

function DeleteImg(){
    if(trashBin.length>0){
        var dataJson = {
            imageId:trashBin
        }
        var request = jQuery.ajax({
            type: "GET",
            url: HOST + "product/delete/image",
            dataType: 'json',
            data: dataJson,

        });
        request.done(function (data) {
            if (data == 'success') {
                toastr.success("Delete success");
            }
            if (data == 'fail') {
                toastr.error("Delete fail");
            }
        });
    }
 
}

function deleteImage(id){
    var dataJson = {
        imageId:id
    };
    var request = jQuery.ajax({
            type: "GET",
            url: HOST + "product/delete/image",
            dataType: 'json',
            data: dataJson,

        });
        request.done(function (data) {
            jQuery("#"+id).remove();
        });
}

function resizeIframe() {
    var obj = document.getElementById('upimg-Frame');
    obj.style.height = ((+obj.contentWindow.document.body.scrollHeight) + 10)+'px';
    setTimeout(resizeIframe, 3000);
}
function checkvalid(dv){
    var strleg = dv.value.length;
    jQuery(dv).removeClass('is-invalid');
    jQuery(dv).removeClass('is-valid');
    jQuery(dv).next('.invalid-feedback').remove();
    jQuery(dv).next('.valid-feedback').remove();
    if(strleg<1 || strleg >50){
        jQuery(dv).after( '<div class="invalid-feedback">invalid this field. Length must more than 0 and less than 51 character</div>' );
        jQuery(dv).addClass('is-invalid');
    }else{
        jQuery(dv).after( '<div class="valid-feedback">Great!</div>' );
        jQuery(dv).addClass('is-valid');
    }
    errorInput= jQuery('body').find('.is-invalid').length;
    validInput= jQuery('body').find('.is-valid').length;
}
function compareArrayOfSize(arr1){
    var result = false;
    if(originSizes==null || arr1.length!= originSizes.length){
        result = true;
    }else{
        for (var i = 0; i < arr1.length; i++) {
            if(arr1[i]!=originSizes[i].Name){
                result = true;
            }
        }
    }
    return result;
}

function addImgRow(){
    jQuery('#imgSto').append('<input type="text" class="form-control" id="pro-image"  name="image" >');
    jQuery('#imgSto').append('<div style="clear: both"></div>');
}