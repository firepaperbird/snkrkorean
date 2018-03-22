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
function checkvalid2(dv){
    var strleg = dv.value.length;
    jQuery(dv).removeClass('is-invalid');
    jQuery(dv).removeClass('is-valid');
    jQuery('.input-group-append').next('.invalid-feedback').remove();
    jQuery('.input-group-append').next('.valid-feedback').remove();
    if(strleg<1 || strleg >50){
        jQuery('.input-group-append').after( '<div class="invalid-feedback">invalid date</div>' );
        jQuery(dv).addClass('is-invalid');
    }else{
        jQuery('.input-group-append').after( '<div class="valid-feedback">Great!</div>' );
        jQuery(dv).addClass('is-valid');
    }
    errorInput= jQuery('body').find('.is-invalid').length;
    validInput= jQuery('body').find('.is-valid').length;
}

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

function CreateItemList(){
    $('.product-list').remove();
    var selectedCategory = $('.category-select').val();
    var dataJSON ={
        categoryId:selectedCategory, 
    };
    if(selectedCategory>=0){
        if(selectedCategory > 0){//product/add
            var request = jQuery.ajax({
                type:"GET",
                url: HOST + "product/get/category",
                dataType:'json',
                data:dataJSON,
                header: {"Access-Control-Allow-Origin":true},
                traditional: true
            });
        }else{
            dataJSON ={
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
        }
        
        request.done(function (data) {
               
            CreateListItem(data);
        });
        request.fail(function (data) {
           console.log("fail roi");
        });
    }
}
function CreateListItem(itemList){
    var contain = $('.apply-list');
    var iList = $('<div class="product-list"></div>');
    itemList.forEach(function(item){
        var proItem = $('<button id="'+item.ProductId+'" class="itemPro btn btn-default">'+item.ProductId+' - '+ item.Name+'</button>');
            proItem.on( "click", function() {
                if(findIdIntable(item.ProductId)==false){
                    addItemToList(item.ProductId,item.Name);
                }else{
                    alert('item: '+item.ProductId+' is exist');
                }
            });
        iList.append( proItem );
    });
    contain.append(iList);
}
var tableRowCount = 0;
var dealProList = [];
function addItemToList(itemId,name){
    var row = $('<tr class="'+itemId+'"></tr>');
    row.append('<th scope="row">'+(++tableRowCount)+'</th>');
    row.append('<td>'+itemId+'</td>');
    row.append('<td>'+name+'</td>');
    row.append('<td><input type="number" value="0" min="0" class="form-control" id="dis-num" onblur="emptyDiscount(this)"></td>');
    row.append('<td><select class="category-select form-control custom-select" id="dis-type" ><option value="0">%</option><option value="1">₩</option></select></td>');
    var del = $('<td><i class="fa fa-times-circle fa-lg" id="del-button" aria-hidden="true"></i></td>');
    del.on("click", function() {
        delPro(itemId);
    });
    row.append(del);
    $('.table tbody').append(row);
    dealProList.push(itemId);
}
function emptyDiscount(dv){
    if($(dv).val()=="")
        $(dv).val(0);
}
function findIdIntable(id)
{
    return ($('tbody .'+id).val()!=null);
}
function delPro(id){
    var i = dealProList.indexOf(id);
    if(i != -1) {
        dealProList.splice(i, 1);
        $('.'+id).remove();
    }
}
function addDeal(){
    if(validInput<3){
        alert('must enter all field');
        return;
    }
    var proList = getProList();//JSON.stringify(getProList());
    var dataJSON = {
        products:proList,
        content:$('#pro-content').val(),
        startTime:$('#StartTime').val(),
        Duration:$('#pro-duration').val(),
    }
    console.log(dataJSON);
    var request = $.ajax({
        type:"POST",
        url: HOST + "/deal/add",
        dataType: 'json',
        data:dataJSON,
    });
    request.done(function (data) {
        alert('add success');
        location.reload();
    });
    request.fail(function (data) {
        console.log(data);
    });
}
function getProList(){
    var data = [];

    dealProList.forEach(function(i, v){
        item = {
            productId: i,
            discount: $('tr #dis-num').eq(v).val(),
            type: ($('tr #dis-type').eq(v).val()==1),
        };
        // console.log(item);
        data.push(item);
    })
    return data;
    // console.log($('tr #dis-num').eq(1).val());
}