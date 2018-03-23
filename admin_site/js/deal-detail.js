$(document).ready(function () {
    loadDeal();
    GetCategories();
});
var errorInput = 0;
var validInput=0;

var tableRowCount = 0;
var dealProList = [];
var StockList = [];

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
                    addNewItemToList(item.ProductId,item.Name);
                }else{
                    alert('item: '+item.ProductId+' is exist');
                }
            });
        iList.append( proItem );
    });
    contain.append(iList);
}
function addNewItemToList(itemId,name){
    var row = $('<tr class="'+itemId+'"></tr>');
    row.append('<th scope="row">'+(++tableRowCount)+'</th>');
    row.append('<td>'+itemId+'</td>');
    row.append('<td>'+name+'</td>');
    row.append('<td><input type="number" value="0" min="0" class="form-control" id="dis-num" onblur="emptyDiscount(this)"></td>');
    row.append('<td><select class="category-select form-control custom-select" id="dis-type" ><option value="false">%</option><option value="true">₩</option></select></td>');
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

function loadDeal(){
    var request = $.ajax({
        type:"Get",
        url: HOST + "deal/"+localStorage.getItem("dealId"),
        dataType: 'json',
    });
    request.done(function (data) {
        createDealDetail(data);
        data.Products.forEach(function(item){
        	addItemToList(item.ProductId,item.Name,item.Discount,item.Type);
      //   	var data = {
		    // 	productId: item.ProductId,
		    // 	discount: item.Discount.toString(),
		    // 	type: item.Type.toString()
		    // }
        	StockList.push(item.ProductId);
        })
    });
    request.fail(function (data) {
        console.log(data);
    });

}

function createDealDetail(Deal){
	$('#pro-content').val(Deal.Content);
	$('#pro-duration').val(Deal.Duration);
	$('#StartTime').val(Deal.StartTime);
}

function addItemToList(itemId,name,dis,type){
        	// console.log(type);
    var row = $('<tr class="'+itemId+'" onclick=""></tr>');
    row.append('<th scope="row">'+(++tableRowCount)+'</th>');
    row.append('<td>'+itemId+'</td>');
    row.append('<td>'+name+'</td>');
    row.append('<td><input type="number" value="'+dis+'" min="0" class="form-control" id="dis-num" onblur="emptyDiscount(this)"></td>');
    var selectTag = $('<select class="form-control custom-select" id="dis-type" ><option value="false">%</option><option value="true">₩</option></select>');
    selectTag.val(type.toString()).prop('selected', true);//filter('[value="'+type+'"]').attr('selected', true);
    row.append($('<td></td>').append(selectTag));
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
        $(dv).val(	);
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
    deleteSend(id);
}

function deleteSend(id){
	var dataJSON = {
		proId: id,
		dealId:localStorage.getItem("dealId")
	}
	var request = $.ajax({
        type:"GET",
        url: HOST + "deal/delete/product",
        dataType: 'json',
        data:dataJSON,
    });
}

function UpdateDeal(){
	if(errorInput>0){
        alert('must enter all field');
        return;
    }
    // var proList = getProList();//JSON.stringify(getProList());
    var dataJSON = {
    	id:localStorage.getItem("dealId"),
        content:$('#pro-content').val(),
        startTime:$('#StartTime').val(),
        Duration:$('#pro-duration').val(),
    }
    console.log(dataJSON);
    var request = $.ajax({
        type:"POST",
        url: HOST + "deal/update",
        dataType: 'json',
        data:dataJSON,
    });
    request.done(function (data) {
        //kiem tra xem có thay doi danh sach products, Co thi gui len API
        if(updateProduct()){
        	alert('success');
        }
        else{
        	alert('Error');
        }
        location.reload();
    });
    request.fail(function (data) {
        console.log(data);
    });
}
function updateProduct(){
	if(isNeedToUpdate(StockList)){
		getProList(StockList).forEach(function(item, v){
			//deal/product/update
			var data = {
				dealId: localStorage.getItem("dealId"),
				productId: item.productId,
				discount: item.discount,
				type: (item.type=="true")
			}
			var request = $.ajax({
		        type:"POST",
		        url: HOST + "deal/product/update",
		        dataType: 'json',
		        data:data,
		    });
		    request.done(function (data) {
		        return true;
		    });
		    request.fail(function (data) {
		        console.log(data);
		    });
		});
		 
	}
	if(StockList.length < dealProList.length){
		getProList(dealProList).forEach(function(item, v){
			//deal/product/update
			if(v>=StockList.length){
				var data = {
					dealId: localStorage.getItem("dealId"),
					productId: item.productId,
					discount: item.discount,
					type: (item.type=="true")
				}
				var request = $.ajax({
			        type:"POST",
			        url: HOST + "deal/product/add",
			        dataType: 'json',
			        data:data,
			    });
			    request.done(function (data) {
			        return true;
			    });
			    request.fail(function (data) {
			        console.log(data);
			    });
			}
		});
	}
	return false;
}
function getProList(ProList){
    var data = [];

    ProList.forEach(function(i, v){
        item = {
            productId: i,
            discount: $('tr #dis-num').eq(v).val(),
            type: $('tr #dis-type').eq(v).val(),
        };
        console.log(item);
        data.push(item);
    })
    return data;
    // console.log($('tr #dis-num').eq(1).val());
}
function isEdited(id){
	console.log('edited');
}
function isNeedToUpdate(obj1){
	obj2 = getProList(dealProList).slice(0,obj1.length);
	return !(JSON.stringify(obj1) == JSON.stringify(obj2));
}