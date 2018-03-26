jQuery(document).ready(function(){
	var orderId = window.localStorage.getItem('orderId');
	GetOrderDetail(orderId);
	jQuery('#confirmDelete').on('hidden.bs.modal', function (e) {
        removeOIDInLocalStorage();
    })
});

function GetOrderDetail(orderId){
    var dataJson = {
        token:getCookie('token')
    }
	var request = jQuery.ajax({
		type: 'GET',
		url: HOST + 'admin/order/'+orderId,
        dataType:'json',
        data:dataJson
	});
	request.done(function(data){
		jQuery('#order-form').append(CreateForm(data));
	});
	request.fail(function(data){
		console.log("Fail");
	});
}

function CreateForm(order) {

    var form = jQuery('<div></div>');
    form.append(CreateDisableInput('Mã đơn',order.OrderId));
    form.append(CreateDisableInput('Khách hàng',order.UserId));
    form.append(CreateDisableInput('Họ tên',order.Fullname));
    form.append(CreateDisableInput('Địa chỉ',order.Address));
    form.append(CreateDisableInput('Điện thoại',order.Phone));
    form.append(CreateDisableInput('Ngày đặt hàng',order.OrderDate.replace('T',' ')));
    form.append(CreateDisabledInputTextarea('Ghi chú',order.Description));
    if (order.Products != null){
    form.append(CreateTable(order.Products,order.TotalPrice));
    }
    form.append(CreateButton(order.StatusName,order.OrderId,order.VoucherId));
    return form;
}

function CreateDisableInput(name,data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+name+"'>"+name+":</label>");
    var input = jQuery("<input type='text' class='form-control' id='"+name+"' value='"+data+"' name='"+name+"' disabled>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateInput(name,data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+name+"'>"+name+":</label>");
    var input = jQuery("<input type='text' class='form-control' id='"+name+"' value='"+data+"' name='"+name+"'>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateDisabledInputTextarea(name, data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+name+"'>"+name+":</label>");
    var input = jQuery("<textarea type='text' class='form-control' rows='5' id='"+name+"' name='"+name+"' disabled></textarea>");
    input.append(data);
    div.append(label);
    div.append(input);
    return div;
}

function CreateTable(products,total,voucherId) {
    var table = jQuery("<table class='table table-striped'></table>");
    table.append(CreateHeader());
    products.forEach(function (product) {
        table.append(CreatetRow(product));
    });
    table.append(CreateTotalRow('Voucher',voucherId));
    table.append(CreateTotalRow('Total',total));
    return table;
}

function CreateHeader() {
    var row = jQuery("<tr class='bg-primary'></tr>");
    row.append('<th>Mã sản phẩm</th>');
    row.append('<th>Kích thước</th>');
    row.append('<th>Số lượng</th>');
    return row;
}

function CreatetRow(item) {
    var row = jQuery("<tr id='"+item.OrderId+"'></tr>");
    row.append(CreateACell(item.ProductId));
    row.append(CreateACell(item.Size));
    row.append(CreateACell(item.Quantity));
    return row;
}


function CreateACell(data) {
    var cell = jQuery('<td></td>');
    cell.append(data);
    return cell;
}

function CreateTotalRow(name, value){
	var row = jQuery('<tr></tr>');
	var col1 = jQuery('<td colspan="2">'+name+'</td>');
	col1.css('font-weight','bold');
	var col2 = CreateACell(value);
	col2.css('font-weight','bold');
	row.append(col1);
	row.append(col2);
	return row;
}

function CreateButton(status,orderId){
	var row = jQuery('<div ></div>')
	if (status == 'not approve'){
        row.append(CreateApproveButton(orderId));
        row.append(CreateCancelButton(orderId));
    }
    if (status == 'approved'){
        row.append(CreateShippingButton(orderId));
        row.append(CreateCancelButton(orderId));
    }
    if (status == 'shipping'){
        row.append(CreateReceivedButton(orderId));
        row.append(CreateCancelButton(orderId));
    }
    if (status == 'received'){
    	var success = jQuery('<p></p>');
    	success.append('Thành công');
    	success.css('font-weight','bold');
    	success.css('color','green');
        row.append(success);
    }
    if(status == 'cancel'){
        var cancel = jQuery('<p></p>');
    	cancel.append('Đã hủy');
    	cancel.css('font-weight','bold');
    	cancel.css('color','red');
        row.append(cancel);
    }
    return row;
}

function CreateShippingButton(id) {
    var icon = jQuery("<button type='button' class='btn btn-info btn-add' onclick='updateStatusOrder("+id+",3)'><i class='fa fa-truck' aria-hidden='true'></i> Giao hàng</button>");
    return icon;
}

function CreateReceivedButton(id) {
    var icon = jQuery("<button type='button' class='btn btn-success btn-add' onclick='updateStatusOrder("+id+",4)'><i class='fa fa-check-square-o' aria-hidden='true'></i> Nhận hàng</button>");
    return icon;
}

function CreateApproveButton(id) {
    var icon = jQuery("<button type='button' class='btn btn-primary btn-add' onclick='updateStatusOrder("+id+",2)'>Duyệt</button>");
    return icon;
}

function CreateCancelButton(id) {
    var icon = jQuery("<button type='button' class='btn btn-danger btn-add' onclick='openConfirmDeleteModal(this)'><i class='fa fa-minus-circle' aria-hidden='true'></i> Hủy</button>");
    icon.attr('id',id);
    return icon;
}

function openConfirmDeleteModal(icon) {
    jQuery('#confirmDelete').modal('show');
    window.localStorage.setItem("oid",icon.id);
}

function removeOIDInLocalStorage() {
    window.localStorage.removeItem("oid");
    jQuery("#confirmDelete").modal('hide');
}

function updateStatusOrder(id, status) {
    var dataJSON={
        status : status
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "admin/order/"+id+"/update/status",
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        console.log("thanh cong roi");
        if (data == 'success'){
            window.location.href='order.html';

        }
        if (data == 'fail'){
            toastr.error("Approve fail");
        }
    });
    request.fail(function (data) {
        console.log("fail roi");
        toastr.error("Approve fail!!!");
    });
}

function cancelOrder() {
    var id = window.localStorage.getItem("oid");
    jQuery("#confirmDelete").modal('hide');
    var dataJSON={
        orderId : id
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "order/cancel",
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        if (data == 'success'){
           window.location.href='order.html';
       }
        if (data == 'fail'){
            toastr.error('Cancel fail');
        }

    });
    request.fail(function (data) {
        toastr.error("Cancel fail!!!");
    });
}
