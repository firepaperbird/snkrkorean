/**
 * Created by ngocnt on 3/10/2018.
 */
jQuery(document).ready(function () {
    var productId = window.localStorage.getItem("productId");
    window.localStorage.removeItem("productId");
    GetProduct(productId);
});
function GetProduct(productId) {
    var request = jQuery.ajax({
        type:"GET",
        url:HOST + "admin/product/"+productId
    });
    request.done(function (data) {
        jQuery('#product-form').append(CreateForm(data));
    });
}

function CreateForm(product) {

    var form = jQuery('<form></form>');
    form.append(CreateDisableInput('ProductId',product.ProductId));
    form.append(CreateInput('Name',product.Name));
    form.append(CreateInput('Brand',product.Brand));
    form.append(CreateInput('Price',product.Price));
    form.append(CreateInput('Country',product.Country));
    form.append(CreateInputTextarea('Description',product.Description));
    form.append(CreateInput('Marterial',product.Marterial));
    form.append(CreateInput('Quantity',product.Quantity));
    form.append(CreateDisableInput('LastModified',product.LastModified));
    form.append(CreateUpdateButton());
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

function CreateInputTextarea(name, data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='"+name+"'>"+name+":</label>");
    var input = jQuery("<textarea type='text' class='form-control' rows='5' id='"+name+"' name='"+name+"'></textarea>");
    input.append(data);
    div.append(label);
    div.append(input);
    return div;
}

function CreateUpdateButton() {
    var button = jQuery('<button class="btn btn-primary btn-lg" onclick="updateProduct()">Update</button>');
    return button;
}

function updateProduct() {
    console.log("Update product!!!");
}