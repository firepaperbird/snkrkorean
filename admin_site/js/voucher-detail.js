/**
 * Created by ngocnt on 3/18/2018.
 */

jQuery(document).ready(function () {
    var voucherId = window.localStorage.getItem("voucherId");
    window.localStorage.removeItem("voucherId");
    GetVoucher(voucherId);
});
function GetVoucher(voucherId) {
    var dataJson = {
        token:getCookie('token')
    }
    var request = jQuery.ajax({
        type:"GET",
        url:HOST + "voucher/"+voucherId,
        dataType:'json',
        data:dataJson
    });
    request.done(function (data) {
        jQuery('#voucher-form').append(CreateForm(data));
    });
}

function CreateForm(voucher) {

    var form = jQuery('<div></div>');
    form.append(CreateDisableInput('Mã giảm giá 할인코드', "VoucherId",voucher.VoucherId));
    form.append(CreateDateTimeInput('Bắt đầu 시작',"StartTime", voucher.StartTime));
    form.append(CreateNumberInput('Diễn ra trong (giờ) 시간',"Duration", voucher.Duration));
    form.append(CreateNumberInput('Giảm giá 할인',"Discount", voucher.Discount));
    form.append(CreateSelectInput('Loại 유형',"Type", voucher.Type));
    form.append(CreateInputTextarea('Mô tả 설명',"Description", voucher.Description));
    form.append(CreateNumberInput('Số lượng 수량',"Quantity", voucher.Amount));
    form.append(CreateUpdateButton());
    return form;
}

function CreateDisableInput(name, id, data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+id+"'>"+name+":</label>");
    var input = jQuery("<input type='text' class='form-control' id='"+id+"' value='"+data+"' name='"+id+"' disabled>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateInput(name, id, data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+id+"'>"+name+":</label>");
    var input = jQuery("<input type='text' class='form-control' id='"+id+"' value='"+data+"' name='"+id+"'>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateInputTextarea(name, id,  data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+id+"'>"+name+":</label>");
    var input = jQuery("<textarea type='text' class='form-control' rows='5' id='"+id+"' name='"+id+"'></textarea>");
    input.append(data);
    div.append(label);
    div.append(input);
    return div;
}

function CreateSelectInput(name, id, valueSelected) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+id+"'>"+name+":</label>");
    var select = jQuery('<select class="form-control" id="'+id+'" name="'+id+'">');
    if (valueSelected == true){
        select.append('<option value="0">%</option>');
        select.append('<option value="1" selected="selected">VND</option>');
    }else{
        select.append('<option value="0" selected="selected">%</option>');
        select.append('<option value="1">VND</option>');
    }
    div.append(label);
    div.append(select);
    return div;
}

function CreateNumberInput(name, id, data){
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+id+"'>"+name+":</label>");
    var input = jQuery("<input type='number' class='form-control' id='"+id+"' value='"+data+"' name='"+id+"'>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateDateTimeInput(name, id, data){
    var date = data.substring(0,data.indexOf('T'));
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+id+"'>"+name+":</label>");
    var input = jQuery("<input type='date' class='form-control' id='"+id+"' value='"+date+"' name='"+id+"'>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateUpdateButton() {
    var button = jQuery('<button class="btn btn-primary btn-lg" onclick="updateVoucher()">Cập nhật</button>');
    return button;
}

function updateVoucher() {

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

    if (IsNotValidNumber(quantity,0,10000000)){
        jQuery('#Quantity').parent().append('<p style="color:red">  Quanity must less than 10,000,000</p>')
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
        quantity: quantity,
        token:getCookie('token')
    };
    var request = jQuery.ajax({
        type:'POST',
        url: HOST+'voucher/update',
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        if (data == 'success'){
            window.location.href = 'voucher.html';
        }
        if (data == 'fail'){
            toastr.error('Update fail!');
        }
    });
    request.fail(function () {
        toastr.error('Update fail!');
    })


}