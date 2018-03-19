/**
 * Created by ngocnt on 3/10/2018.
 */
jQuery(document).ready(function () {
    GetAllProduct();
    jQuery('#confirmDelete').on('hidden.bs.modal', function (e) {
        removeOIDInLocalStorage();
    })
});

function GetAllProduct() {
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "admin/product",
    });
    request.done(function (data) {
        CreateProductTable(data);
    });
    request.fail(function (data) {
        console.log("fail roi");
    });
}

function CreateProductTable(products) {
    var table = jQuery("#product-table");
    products.forEach(function (product) {
       table.append(CreateProductRow(product));
    });
}

function CreateProductRow(product) {
    var row = jQuery("<tr id='"+product.ProductId+"'></tr>");
    row.append(CreateACell(product.ProductId));
    row.append(CreateACell(product.Name));
    row.append(CreateACell(product.Price));
    row.append(CreateACell(product.Category));
    row.append(CreateACell(product.Quantity));
    row.append(CreateACell(product.LastModified));
    row.append(CreateEditButton(product.ProductId));
    row.append(CreateDeleteButton(product.ProductId));
    return row;
}
function CreateACell(data) {
    var cell = jQuery('<td></td>');
    cell.append(data);
    return cell;
}
function CreateEditButton(productId) {
    var button = jQuery('<td class="ic-edit"></td>');
    // var icon = jQuery('<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true" onclick="editProduct()" id=""></i>');
    var icon = jQuery("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true' onclick='editProduct("+productId+")'></i>");

    button.append(icon);
    return button;
}

function CreateDeleteButton(productId) {
    var button = jQuery('<td class="ic-delete"></td>');
    var icon = jQuery("<i class='fa fa-trash-o fa-lg' aria-hidden='true' onclick='openConfirmDeleteModal(this)'></i>");
    icon.attr('id',productId);
    button.append(icon);
    return button;
}

function openConfirmDeleteModal(icon) {
    jQuery('#confirmDelete').modal('show');
    window.localStorage.setItem("pid",icon.id);
}

function removePIDInLocalStorage() {
    window.localStorage.removeItem("pid");
    jQuery("#confirmDelete").modal('hide');
}

function editProduct(productId) {
    localStorage.setItem("productId",productId);
    // window.location.href = 'http://localhost:63342/trunk/admin_site/product-detail.html';
    window.location.href = '../admin_site/product-detail.html';
}
function deleteProduct() {
    var productId = window.localStorage.getItem('pid');
    jQuery("#confirmDelete").modal('hide');
    var dataJSON={
        productId : productId
    };
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "product/delete",
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        console.log("thanh cong roi");
        jQuery("#"+productId+"").remove();
        toastr.success("Delete success");
    });
    request.fail(function (data) {
        console.log("fail roi");
        toastr.error("Delete fail!!!");
    });
}


