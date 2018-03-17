/**
 * Created by ngocnt on 3/17/2018.
 */
function addVoucher(){
    jQuery('#VoucherId').next('p').remove();
    jQuery('#StartTime').next('p').remove();
    jQuery('#Duration').next('p').remove();
    jQuery('#Discount').next('p').remove();
    jQuery('#Description').next('p').remove();
    jQuery('#Quantity').next('p').remove();

    var voucherId = jQuery('#VoucherId').val();
    var startTime = jQuery('#StartTime').val();
    var duration = jQuery('#Duration').val();
    var discount = jQuery('#Discount').val();
    var description = jQuery('#Description').val();
    var quantity = jQuery('#Quantity').val();
    var type = jQuery('#Type').val();

    var isError = false;
    if (IsOutRange(voucherId, 1, 50)) {
        jQuery('#VoucherId').parent().append('<p style="color:red">  Voucher length must from 1 to 50 characters</p>')
        isError = true;
    }
    if (IsNotValidNumber(duration,1,10000)){
        jQuery('#Duration').parent().append('<p style="color:red">  Duration must be an integer in range [1..10000]</p>')
        isError = true;
    }
    if (type == 0){
        if (IsNotValidNumber(discount,1,100)){
            jQuery('#Discount').parent().append('<p style="color:red">  Discount must be from 1-100 when Type is \'%\'</p>')
            isError = true;
        }
    }else{
        if (type == 1){
            if (IsNotValidNumber(discount,1000,10000000)){
                jQuery('#Discount').parent().append('<p style="color:red">  Discount must be from 1,000-100,000,000 when Type is \'VND\'</p>')
                isError = true;
            }
        }
    }

    if (IsOutRange(description, 0, 150)) {
        jQuery('#Description').parent().append('<p style="color:red">  Description must from 1 to 150 characters</p>')
        isError = true;
    }

    if (IsNotValidNumber(quantity,1,10000000)){
        jQuery('#Quantity').parent().append('<p style="color:red">  Quanity must from 1 to 10,000,000</p>')
        isError = true;
    }

    if (isError) {
        return;
    }

    var dataJSON = {
        voucherId: voucherId,
        type: type == 0? false:true,
        discount: discount,
        description: description,
        startTime: startTime,
        duration: duration,
        quantity: quantity
    };
    var request = jQuery.ajax({
        type:'POST',
        url: HOST+'voucher/add',
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        if (data == 'success'){
            window.location.href = 'voucher.html';
        }
        if (data == 'fail'){
            toastr.error('Add fail!');
        }
    });
    request.fail(function () {
        toastr.error('Add fail!');
    })
    
    
}