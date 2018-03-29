$(document).ready(function () {
    userLoged();
    $(function () {
        $('.btn-checkout').click(function () {
            checkout();
        });
    });
});

function userLoged() {
    var dataJSON = {
        username: JSON.parse(sessionStorage.getItem('customer')),
        token:getCookie("token")
    }
    var request = jQuery.ajax({
        type: "GET",
        // url: "https://snkrapiv2.azurewebsites.net/user/login",
        url: HOST + "user/profile",
        dataType: 'json',
        data: dataJSON,
        header: {"Access-Control-Allow-Origin": true},
        traditional: true

    });
    request.done(function (data) {
        if (data != null) {
            autoFillForUser(data);
        }
    });
    request.fail(function (data) {
        console.log('fail');
    });

}
function autoFillForUser(data) {
    $('#fullname').val(data.Fullname);
    $('#phone').val(data.Phone);
    $('#email').val(data.Email);
    $('#address').val(data.Address);
    updateTotalBill();
}
function updateTotalBill() {
    var cart = JSON.parse(sessionStorage.getItem('order'));
    $(".total-last").text(cart.orderbill.total + currency);
}

function checkout() {
    var cart = JSON.parse(sessionStorage.getItem('order'));
    if (cart != null){
        var productslist = [];
        cart.productslist.forEach(function (item, index) {
        var newItem = {
            productId: item.id,
            quantity: item.quantity,
            size: item.size
        };
        productslist.push(newItem);
    });
    var username = JSON.parse(sessionStorage.getItem('customer'));
    var totalPrice = cart.orderbill.total;
    var products = productslist;
    var voucher = cart.voucher;

    sendOrder(username, totalPrice, products, voucher);
    }else{
        toastr.warning("You should buy something before checkout");
    }
    
}
function sendOrder(username, totalPrice, products, voucher) {
    var dataJson = {
        username: username,
        fullname: $('#fullname').val(),
        phone: $('#phone').val(),
        address: $('#address').val(),
        note: $('#note').val(),
        totalPrice: totalPrice,
        products: products,
        voucher: voucher,
        token:getCookie("token")
    };
    console.log(dataJson);
    var request = jQuery.ajax({
        type: "POST",
        // url: "https://snkrapiv2.azurewebsites.net/user/login",
        url: HOST + "order/checkout",
        dataType: 'json',
        data: dataJson,


    });
    request.done(function (data) {
        if (data == 'success') {
            toastr.success("Checkout success");
            window.location.href="../products.html";
            localStorage.removeItem("cartlist");
            sessionStorage.removeItem("order");
        }
        if (data == 'fail') {
            toastr.error("Checkout fail");
        }
    });
    request.fail(function (data) {
        toastr.error("Checkout fail");
    })
}
