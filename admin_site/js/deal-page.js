/**
 * Created by ngocnt on 3/11/2018.
 */
/**
 * Created by ngocnt on 3/10/2018.
 */
jQuery(document).ready(function () {
    GetAllDeal();
    jQuery('#confirmDelete').on('hidden.bs.modal', function (e) {
        removeDIDInLocalStorage();
    })
});

function GetAllDeal() {
    var dataJSON ={
        token:getCookie('token')
    }
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "deal/all",
        dataType:'json',
        data:dataJSON
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
    row.append(CreateACell(item.StartTime.replace('T',' ')));
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
    var icon = jQuery("<i class='fa fa-trash-o fa-lg' aria-hidden='true' onclick='openConfirmDeleteModal(this)'></i>");
    icon.attr('id',id);
    button.append(icon);
    return button;
}

function openConfirmDeleteModal(icon) {
    jQuery('#confirmDelete').modal('show');
    window.localStorage.setItem("did",icon.id);
}

function removeDIDInLocalStorage() {
    window.localStorage.removeItem("did");
    jQuery("#confirmDelete").modal('hide');
}

function editDeal(id) {
    localStorage.setItem("dealId",id);
    window.location.href = '../admin_site/deal-detail.html';
}
function deleteDeal() {
    var id = window.localStorage.getItem("did");
    jQuery('#confirmDelete').modal('hide');
    var dataJSON={
        dealId : id,
        token:getCookie('token')
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


