$(document).ready(function () {
	userLoged();
	$(function(){
		$('.btn-checkout').click(function(){
			checkout();
		});
	});
});

function userLoged() {
    var dataJSON = {
        username: JSON.parse(sessionStorage.getItem('customer')),
    }
    var request = jQuery.ajax({
        type:"GET",
        // url: "https://snkrapiv2.azurewebsites.net/user/login",
        url: HOST + "/user/profile",
        dataType: 'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true

    });
    request.done(function (data) {
        if (data != null){
        	autoFillForUser(data);
        }
    });
    request.fail(function (data) {
       console.log(data);
    });

}
function autoFillForUser(data){
	$('#fullname').val(data.Fullname);
	$('#phone').val(data.Phone);
	$('#email').val(data.Email);
	$('#address').val(data.Address);
	updateTotalBill();
}
function updateTotalBill(){
	var cart = JSON.parse(sessionStorage.getItem('order'));    
    $(".total-last").text(cart.orderbill.total+currency);   
}

function checkout(){
	var cart = JSON.parse(sessionStorage.getItem('order'));	
	var productslist = [];
	cart.productslist.forEach(function (item,index) {
		var newItem={
			productId:item.id,
			quantity:item.quantity
		};
		productslist.push(newItem);
	});
	var order = {
		username:JSON.parse(sessionStorage.getItem('customer')),
		totalPrice: cart.orderbill.total,
		products:productslist,
		voucher:cart.voucher,
	};
	// console.log(productslist);
	sendOrder(order);
}
function sendOrder(data){
    var request = jQuery.ajax({
        type:"POST",
        // url: "https://snkrapiv2.azurewebsites.net/user/login",
        url: HOST + "order/checkout",
        dataType: 'json',
        data:data,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true

    });
    request.done(function (data) {
        if (data != null){
        	alert('checkout success');
        }
    });
}
