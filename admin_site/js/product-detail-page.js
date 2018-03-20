/**
 * Created by ngocnt on 3/10/2018.
 */
jQuery(document).ready(function () {
    var productId = window.localStorage.getItem("productId");
    window.localStorage.removeItem("productId");
    GetProduct(productId);
});
function GetProduct(productId) {
    var request = jQuery.ajax({
        type:"GET",
        url:HOST + "admin/product/"+productId
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
}

function createSize(sizelist){
    var toString = '';
    sizelist.forEach(function(item){
        toString+=item.Name+', ';
    });
    jQuery('#pro-size').val(toString);
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
    return category;
}
function createImg(imgList){
    var itme = jQuery('#currentImg');
    imgList.forEach(function(Image,index){
        var imgItem = jQuery('<img src="'+Image.Url+'" id="'+Image.Id+'" class="itemImg">');
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
        itme.append(imgItem);
    });
}

var trashBin = [];
function addImgToTrash(id){
    trashBin.push(id);
    jQuery('#'+id).addClass('trashImg');
}
function removeFromTrash(index,imgId) {
    jQuery('#'+imgId).removeClass('trashImg');
    trashBin.splice(index, 1);
}


function UpdateProduct() {
    alert("Update product!!!");
}
function resizeIframe() {
    var obj = document.getElementById('upimg-Frame');
    obj.style.height = ((+obj.contentWindow.document.body.scrollHeight) + 10)+'px';
    setTimeout(resizeIframe, 3000);
 }