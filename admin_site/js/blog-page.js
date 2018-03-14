/**
 * Created by ngocnt on 3/12/2018.
 */
jQuery(document).ready(function () {
    GetAllPost();
});

function GetAllPost() {
    var dataJSON = {
        sortTime : -1
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "post/all",
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

function CreateTable(data) {
    var table = jQuery("#blog-table");
    data.forEach(function (item) {
        table.append(CreatetRow(item));
    });
}

function CreatetRow(item) {
    var row = jQuery("<tr id='"+item.Id+"'></tr>");
    row.append(CreateACell(item.Id));
    row.append(CreateACell(item.Title));
    row.append(CreateACell(item.Content));
    row.append(CreateACell(item.PostTime));
    row.append(CreateACell(item.UserId));
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
    var icon = jQuery("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true' onclick='editBlog("+id+")'></i>");

    button.append(icon);
    return button;
}

function CreateDeleteButton(id) {
    var button = jQuery('<td class="ic-delete"></td>');
    var icon = jQuery("<i class='fa fa-trash-o fa-lg' aria-hidden='true' onclick='deleteBlog("+id+")'></i>");
    button.append(icon);
    return button;
}

function editBlog(id) {
    localStorage.setItem("dealId",id);
    window.location.href = 'http://localhost:63342/trunk/admin_site/blog-detail.html';
}
function deleteBlog(id) {
    var dataJSON={
        postId : id
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "post/delete",
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


