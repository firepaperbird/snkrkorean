/**
 * Created by ngocnt on 3/11/2018.
 */
jQuery(document).ready(function () {
    GetAllCategory();
    jQuery('#confirmDelete').on('hidden.bs.modal', function (e) {
        removeCIDInLocalStorage();
    })
});

function GetAllCategory() {
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "category/all",
    });
    request.done(function (data) {
        CreateCategoryTable(data);
    });
    request.fail(function (data) {
        console.log("fail roi");
    });
}

function CreateCategoryTable(categories) {
    var table = jQuery("#category-table");
    categories.forEach(function (category) {
        table.append(CreateProductRow(category));
    });
}

function CreateProductRow(category) {
    var row = jQuery("<tr id='"+category.Id+"'></tr>");
    row.append(CreateACell(category.Id));
    row.append(CreateACell(category.Name));
    row.append(CreateACell(category.Description ));
    // if (category.ParentId == 0){
    //     row.append(CreateACell('None'));
    // }else{
    //     row.append(CreateACell(category.ParentId));
    // }
    row.append(CreateEditButton(category.Id));
    row.append(CreateDeleteButton(category.Id));
    return row;
}
function CreateACell(data) {
    var cell = jQuery('<td></td>');
    cell.append(data);
    return cell;
}
function CreateEditButton(categoryId) {
    var button = jQuery('<td class="ic-edit"></td>');
    // var icon = jQuery('<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" onclick="editProduct()" id=""></i>');
    var icon = jQuery("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true' onclick='editCategory("+categoryId+")'></i>");
    button.append(icon);
    return button;
}

function CreateDeleteButton(categoryId) {
    var button = jQuery('<td class="ic-delete"></td>');
    var icon = jQuery("<i class='fa fa-trash-o fa-lg' aria-hidden='true' onclick='openConfirmDeleteModal(this)'></i>");
    icon.attr('id',categoryId);
    button.append(icon);
    return button;
}

function openConfirmDeleteModal(icon) {
    jQuery('#confirmDelete').modal('show');
    window.localStorage.setItem("cid",icon.id);
}

function removeCIDInLocalStorage() {
    window.localStorage.removeItem("cid");
    jQuery("#confirmDelete").modal('hide');
}


function editCategory(categoryId) {
    window.localStorage.setItem("categoryId",categoryId);
    window.location.href = '../admin_site/category-detail.html';
}
function deleteCategory() {
    categoryId = window.localStorage.getItem("cid");
    jQuery('#confirmDelete').modal('hide');
    var dataJSON={
        categoryId : categoryId,
        token:getCookie("token")
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "category/delete",
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        console.log("thanh cong roi");
        jQuery("#"+categoryId+"").remove();
        toastr.success("Delete success");
    });
    request.fail(function (data) {
        console.log("fail roi");
        toastr.error("Delete fail!!!");
    });
}