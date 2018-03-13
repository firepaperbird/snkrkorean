/**
 * Created by ngocnt on 3/11/2018.
 */
/**
 * Created by ngocnt on 3/10/2018.
 */
jQuery(document).ready(function () {
    GetAllDeal();
});

function GetAllDeal() {
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "deal/all",
    });
    request.done(function (data) {
        CreateTable(data);
    });
    request.fail(function (data) {
        console.log("fail roi");
    });
}

function CreateTable(deals) {
    var table = jQuery("#deal-table");
    deals.forEach(function (deal) {
        table.append(CreatetRow(deal));
    });
}

function CreatetRow(item) {
    var row = jQuery("<tr id='"+item.Id+"'></tr>");
    row.append(CreateACell(item.Id));
    row.append(CreateACell(item.Content));
    row.append(CreateACell(item.Duration));
    row.append(CreateACell(item.StartTime));
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
    var icon = jQuery("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true' onclick='editDeal("+id+")'></i>");

    button.append(icon);
    return button;
}

function CreateDeleteButton(id) {
    var button = jQuery('<td class="ic-delete"></td>');
    var icon = jQuery("<i class='fa fa-trash-o fa-lg' aria-hidden='true' onclick='deleteDeal("+id+")'></i>");
    button.append(icon);
    return button;
}

function editDeal(id) {
    localStorage.setItem("dealId",id);
    window.location.href = 'http://localhost:63342/trunk/admin_site/deal-detail.html';
}
function deleteDeal(id) {
    var dataJSON={
        dealId : id
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "deal/delete",
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

