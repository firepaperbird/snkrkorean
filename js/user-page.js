function openNav() {
    document.getElementById("mySidenav").style.width = "50vw";
    document.getElementById("main").style.marginLeft = "50vw";
    // document.getElementById("main").style.paddingLeft = "0px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    // document.getElementById("main").style.paddingLeft = "30vw";
}

$(document).ready(function (){
	if(sessionStorage.getItem('customer')==null || sessionStorage.getItem('customer')==""){
		window.location.replace('404.html');
	}else{
		loadUserInfo();
		loadOrder();
	}
	
});

function loadUserInfo(){
    var dataJson = {
        username:JSON.parse(sessionStorage.getItem('customer')),
        token:getCookie("token")
    }
	var request = jQuery.ajax({
        type:"GET",
        url:HOST + "user/profile",
        dataType:'json',
        data:dataJson
    });
    request.done(function (data) {
        CreateForm(data);
    });
}
function CreateForm(user){
	$('#username').val(user.Username);
	$('#phone').val(user.Phone);
	$('#email').val(user.Email);
	$('#address').val(user.Address);
}

function loadOrder(){
    var dataJson = {
        userId:sessionStorage.getItem('customer'),
        token:getCookie('token')
    }
	var request = jQuery.ajax({
        type:"GET",
        url:HOST + "order/history",
        dataType:'json',
        data:dataJson
    });
    request.done(function (data) {
        CreateOrderHistory(data);
    });
}

function CreateOrderHistory(ordList){
	ordList.forEach(function(ord,idx){
		var row = $('<tr></tr>');
		row.append($( '<td> '+ ord.OrderId + '</td>' ));
		row.append($( '<td> '+ ord.TotalPrice + '</td>' ));
		row.append($( '<td> '+ ord.OrderDate.replace('T',' ') + '</td>' ));
		row.append($( '<td> '+ createApprove(ord.OrderStatus) + '</td>' ));
	});
}
function createApprove(stt){
	if (stt == 1){
        return 'Processing';
    }
    if (stt == 2){
        return 'shipping';
    }
    if (stt == 4 || stt == 3){
        return 'Success';
    }
    if(stt == 5){
        return 'Canceled';
    }
}