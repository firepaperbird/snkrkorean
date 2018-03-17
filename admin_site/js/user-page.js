/**
 * Created by ngocnt on 3/12/2018.
 */
/**
 * Created by ngocnt on 3/12/2018.
 */

jQuery(document).ready(function () {
    GetAllUser();
    jQuery('#confirmDelete').on('hidden.bs.modal', function (e) {
        removeUIDInLocalStorage();
    })
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
    if (data != null){
        data.forEach(function (item) {
            table.append(CreatetRow(item));
        });
    }

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
    var icon = jQuery("<button type='button' class='btn btn-danger btn-add'><i class='fa fa-ban' aria-hidden='true'></i> Block</button>");
    icon.on('click', function(){
        openConfirmDeleteModal(this)
    });
    icon.attr('id',id);
    button.append(icon);
    return button;
}

function openConfirmDeleteModal(icon) {
    jQuery('#confirmDelete').modal('show');
    window.localStorage.setItem("uid",icon.id);
}

function removeUIDInLocalStorage() {
    window.localStorage.removeItem("uid");
    jQuery("#confirmDelete").modal('hide');
}

function expiredUser() {
    var id = window.localStorage.getItem("uid");
    jQuery("#confirmDelete").modal('hide');
    var dataJSON={
        username : id
    };
    console.log(dataJSON);
    var request = jQuery.ajax({
        type:'GET',
        url: HOST + 'user/delete',
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        console.log(data);
        if (data == 'success'){
            jQuery('#'+id+'').remove();
            toastr.success('Block success');
        }
        if (data == 'fail'){
            toastr.error('Block fail')
        }
    });
    request.fail(function (data) {
        console.log(data);
        toastr.error('Block fail');
    });
}


