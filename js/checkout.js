$(document).ready(function () {
    userLoged();
    $(function () {
        $('.btn-checkout').click(function () {
            checkout();
        });
    });
});

function userLoged() {
    var id =JSON.parse(sessionStorage.getItem('customer')).id;
    var dataJSON = {
        username: id
        // token:getCookie("token")
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
    if(data.Email!=null && data.Email != ''){
        $('#email').attr('disabled','disabled');
    }
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
    var username = JSON.parse(sessionStorage.getItem('customer')).name;
    var totalPrice = cart.orderbill.total;
    var products = productslist;
    var voucher = cart.voucher;

    if(validateField()){
        if($('#email').is(':disabled')){
            updateEmail(username,jQuery("#email").val());
        }
        sendOrder(username, totalPrice, products, voucher);

    }

    }else{
        toastr.warning("You should buy something before checkout");
    }
    
}

function updateEmail(userId, email){
    var dataJson = {
        userId: userId,
        email:email
    }

    var request = jQuery.ajax({
        type: "POST",
        url: HOST + "user/update/email",
        dataType: 'json',
        data: dataJson,


    });
    request.done(function (data) {
        if (data == 'success') {
            //do somethign
        }
        if (data == 'fail') {
            toastr.error("update email fail");
        }
    });
    request.fail(function (data) {
        toastr.error("update email fail");
    })

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
        voucher: voucher
        // token:getCookie("token")
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

function validateField(){
    var fullname = jQuery("#fullname").val();
    var email = jQuery("#email").val();
    var phone = jQuery("#phone").val();
    var address = jQuery("#address").val();

    jQuery("#fullName").next().remove();
    jQuery("#email").next().remove();
    jQuery("#phone").next().remove();
    jQuery("#address").next().remove();

    var isError = false;
    
  
    if (IsOutRange(fullname, 2,50)){
        isError = true;
        jQuery('#fullName').parent().append(CreateErrorMessage('Fullname must have 2-50 characters'));
    }
    
    if (IsNotMatch(email,/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/)){
        isError = true;
        jQuery('#email').parent().append(CreateErrorMessage('Email not valid'));
    }

    if (IsNotMatch(phone, /[0-9-()+]{3,20}/)){
        phone = true;
        jQuery('#phone').parent().append(CreateErrorMessage('Phone not valid'));
    }

    if (address == ""){
        phone = true;
        jQuery('#address').parent().append(CreateErrorMessage('Address not valid'));
    }
    return isError;
}



function CreateErrorMessage(msg){
    var pTag = jQuery('<p></p>');
    pTag.append(msg);
    pTag.css('color','red');
    return pTag;
}


function CreateOKMessage(msg){
    var pTag = jQuery('<p></p>');
    pTag.append(msg);
    pTag.css('color','green');
    return pTag;
}


function IsOutRange(text,min,max){
    if (text.trim().length < min || text.trim().length > max){
        return true;
    }
    return false;
}

function IsNotValidNumber(text,min,max){
    var regex = /[1-9][0-9]{0,5}/;
    if (!regex.test(text)){
        return true;
    }
    console.log(parseInt(text));
    if (parseInt(text) < min || parseInt > max){
        return true;
    }
    return false;
}

function IsNotMatch(text,regex){
    return !regex.test(text);
}
