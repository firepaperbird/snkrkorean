/**
 * Created by ngocnt on 3/10/2018.
 */
jQuery(document).ready(function () {
    GetAllVoucher();
});

function GetAllVoucher() {
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "voucher/all"
    });
    request.done(function (data) {
        CreateTable(data);
    });
    request.fail(function (data) {
        console.log("fail roi");
    });
}

function CreateTable(data) {
    var table = jQuery("#voucher-table");
    data.forEach(function (item) {
        table.append(CreatetRow(item));
    });
}

function CreatetRow(item) {
    var row = jQuery("<tr id='"+item.Id+"'></tr>");
    row.append(CreateACell(item.VoucherId));
    row.append(CreateACell(item.Description));
    row.append(CreateACell(item.Discount));
    row.append(CreateACell(item.Type));
    row.append(CreateACell(item.Duration));
    row.append(CreateACell(item.StartTime));
    row.append(CreateACell(item.Amount));
    row.append(CreateEditButton(item.Id));
    row.append(CreateDeleteButton(item.Id));
    return row;
}
function CreateACell(data) {
    var cell = jQuery('<td></td>');
    cell.append(data);
    return cell;
}
function CreateEditButton(id) {
    var button = jQuery('<td class="ic-edit"></td>');
    // var icon = jQuery('<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" onclick="editProduct()" id=""></i>');
    var icon = jQuery("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true' onclick='editVoucher("+id+")'></i>");

    button.append(icon);
    return button;
}

function CreateDeleteButton(id) {
    var button = jQuery('<td class="ic-delete"></td>');
    var icon = jQuery("<i class='fa fa-trash-o fa-lg' aria-hidden='true' onclick='deleteVoucher("+id+")'></i>");
    button.append(icon);
    return button;
}

function editVoucher(id) {
    localStorage.setItem("dealId",id);
    window.location.href = 'http://localhost:63342/trunk/admin_site/voucher-detail.html';
}
function deleteVoucher(id) {
    var dataJSON={
        dealId : id
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "voucher/delete",
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        console.log("thanh cong roi");
        jQuery("#"+id+"").remove();
        toastr.success("Delete success");
    });
    request.fail(function (data) {
        console.log("fail roi");
        toastr.error("Delete fail!!!");
    });
}


