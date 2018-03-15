/**
 * Created by ngocnt on 3/12/2018.
 */
/**
 * Created by ngocnt on 3/12/2018.
 */

jQuery(document).ready(function () {
    GetAllUser();
});

function GetAllUser() {

    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "user/all",

    });
    request.done(function (data) {
        CreateTable(data);
    });
    request.fail(function (data) {
        console.log("fail roi");
    });
}

function CreateTable(data) {
    var table = jQuery("#user-table");
    data.forEach(function (item) {
        table.append(CreatetRow(item));
    });
}

function CreatetRow(item) {
    var row = jQuery("<tr id='"+item.Username+"'></tr>");
    row.append(CreateACell(item.Username));
    row.append(CreateACell(item.Fullname));
    row.append(CreateACell(item.GenderName));
    row.append(CreateACell(item.Email));
    row.append(CreateACell(item.Phone));
    row.append(CreateACell(item.Address));
    row.append(CreateACell(item.RegisterDate));
    row.append(CreateACell(item.Role));
    row.append(CreateExpiredButton(item.Username));
    return row;
}
function CreateACell(data) {
    var cell = jQuery('<td></td>');
    cell.append(data);
    return cell;
}
function CreateExpiredButton(id) {
    var button = jQuery('<td></td>');
    var icon = jQuery("<button type='button' class='btn btn-danger btn-add' onclick='expiredUser("+id+")'><i class='fa fa-ban' aria-hidden='true'></i> Block</button>");
    button.append(icon);
    return button;
}

function expiredUser(id) {
    var dataJSON={
        username : id
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "user/delete",
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        console.log("thanh cong roi");
        if (data == 'success'){
            toastr.success("Expired success");
            jQuery("#"+id+"").remove();
        }
        if (data =='fail'){
            toastr.error('Expired fail');
        }

    });
    request.fail(function (data) {
        console.log("fail roi");
        toastr.error("Expired fail!!!");
    });
}

