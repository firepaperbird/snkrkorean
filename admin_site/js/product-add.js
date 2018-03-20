
$(document).ready(function () {
	GetCategories();
	
});
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
        jQuery(dv).after( '<div class="invalid-feedback">invalid this field. Length must more than 0 and less than 51 character</div>' );
        jQuery(dv).addClass('is-invalid');
    }else{
        jQuery(dv).after( '<div class="valid-feedback">Great!</div>' );
        jQuery(dv).addClass('is-valid');
    }
    errorInput= jQuery('body').find('.is-invalid').length;
    validInput= jQuery('body').find('.is-valid').length;
}

function addProduct() {
    if(validInput<5){
        alert('must enter all * field');
        return;
    }
    var sizeslist = jQuery('#pro-size').val().split(",");
    sizeslist.forEach(function(si){
        si=si.trim();
    })
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
        sizes: sizeslist
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
            location.reload();
        }
    });
    request.fail(function (data) {
        console.log(data);
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