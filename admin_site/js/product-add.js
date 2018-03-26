

$(document).ready(function () {
	GetCategories();
	
});
function GetCategories() {
    var request=jQuery.ajax({
        type:"GET",
        url:HOST + "category/all"
    });
    request.done(function (data) { 
        if(data!=null){
            CreateListCategory(data);
        }else{
            alert ("không có category, xin add category trước.")
            window.location.href = "../admin_site/category-add.html";
        }   
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
    return category;
}
var errorInput = 0;
var validInput=0;
function checkvalid(dv){
    var strleg = dv.value.length;
    jQuery(dv).removeClass('is-invalid');
    jQuery(dv).removeClass('is-valid');
    jQuery(dv).next('.invalid-feedback').remove();
    jQuery(dv).next('.valid-feedback').remove();
    if(strleg<1 || strleg >50){
        jQuery(dv).after( '<div class="invalid-feedback">không hợp lệ. không được để trống và không vượt quá 50 ký tự</div>' );
        jQuery(dv).addClass('is-invalid');
    }else{
        jQuery(dv).after( '<div class="valid-feedback">Chuẩn!</div>' );
        jQuery(dv).addClass('is-valid');
    }
    errorInput= jQuery('body').find('.is-invalid').length;
    validInput= jQuery('body').find('.is-valid').length;
}

function checkValidNum(dv){
    var str = dv.value;
    jQuery(dv).removeClass('is-invalid');
    jQuery(dv).removeClass('is-valid');
    jQuery(dv).next('.invalid-feedback').remove();
    jQuery(dv).next('.valid-feedback').remove();
    if(IsNotValidNumber(str,0)){
        jQuery(dv).after( '<div class="invalid-feedback">không hợp lệ. Chỉ được nhập số từ 0 đến 9 </div>' );
        jQuery(dv).addClass('is-invalid');
    }else{
        jQuery(dv).after( '<div class="valid-feedback">Chuẩn!</div>' );
        jQuery(dv).addClass('is-valid');
    }
    errorInput= jQuery('body').find('.is-invalid').length;
    validInput= jQuery('body').find('.is-valid').length;
}

function IsNotValidNumber(text,min){
    var regex = /[1-9][0-9]{0,5}/;
    if (!regex.test(text)){
        return true;
    }
    console.log(parseInt(text));
    if (parseInt(text) < min ){
        return true;
    }
    return false;
}


function isCategoryNone(){
    return jQuery('#pro-category').val()==0;
}

function addProduct() {
    if(validInput<5){
        alert('Xin nhập đủ các ô');
        return;
    }
    if(isCategoryNone()){
        alert('Xin hãy chọn category cho product');
        return;
    }
    var sizeslist = jQuery('#pro-size').val().split(",");
    sizeslist.forEach(function(si){
        si=si.trim();
    });
    var dataJSON = {
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
        token:getCookie('token')
    };
    // console.log(dataJSON.images);
    var request = jQuery.ajax({
        type: "POST",
        url: HOST + "product/add",
        dataType: 'json',
        data: dataJSON,
        header: {"Access-Control-Allow-Origin": true},
        traditional: true

    });
    request.done(function (data) {
        if (data != null) {
            // autoFillForUser(data);
            window.location.href = "../admin_site/product.html";
        }
    });
    request.fail(function (data) {
        toastr.error("Add fail!")
    });

}
function resizeIframe() {
	var obj = document.getElementById('upimg-Frame');
    obj.style.height = ((+obj.contentWindow.document.body.scrollHeight) + 10)+'px';
    setTimeout(resizeIframe, 3000);
 }

function addImgRow(){
	jQuery('#imgSto').append('<input type="text" class="form-control" id="pro-image"  name="image" >');
	
}