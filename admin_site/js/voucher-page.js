/**
 * Created by ngocnt on 3/10/2018.
 */
jQuery(document).ready(function () {
    GetAllVoucher();
    jQuery('#confirmDelete').on('hidden.bs.modal', function (e) {
        removeVIDInLocalStorage();
    })
});

function GetAllVoucher() {
    var dataJson = {
        token: getCookie('token')
    }
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "voucher/all",
        dataType:'json',
        data:dataJson
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
    var row = jQuery("<tr id='"+item.VoucherId+"'></tr>");
    row.append(CreateACell(item.VoucherId));
    row.append(CreateACell(item.Description));
    row.append(CreateACell(item.Discount));
    if (item.Type == true){
        row.append(CreateACell("VND"));
    }else{
        row.append(CreateACell("%"));

    }
    row.append(CreateACell(item.Duration));
    row.append(CreateACell(item.StartTime.replace('T',' ')));
    row.append(CreateACell(item.Amount));
    row.append(CreateEditButton(item.VoucherId));
    row.append(CreateDeleteButton(item.VoucherId));
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
    var icon = jQuery("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true''></i>");
    icon.on('click',function () {
       editVoucher(id);
    });
    button.append(icon);
    return button;
}

function CreateDeleteButton(id) {
    var button = jQuery('<td class="ic-delete"></td>');
    var icon = jQuery("<i class='fa fa-trash-o fa-lg' aria-hidden='true' onclick='openConfirmDeleteModal(this)'></i>");
    icon.attr('id',id);
    button.append(icon);
    return button;
}

function openConfirmDeleteModal(icon) {
    jQuery('#confirmDelete').modal('show');
    window.localStorage.setItem("vid",icon.id);
}

function removeVIDInLocalStorage() {
    window.localStorage.removeItem("vid");
    jQuery("#confirmDelete").modal('hide');
}

function editVoucher(id) {
    localStorage.setItem("voucherId",id);
    window.location.href = '../admin_site/voucher-detail.html';
}
function deleteVoucher() {
    var id = window.localStorage.getItem("vid");
    jQuery('#confirmDelete').modal('hide');
    var dataJSON={
        voucherId : id,
        token:getCookie('token')
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


