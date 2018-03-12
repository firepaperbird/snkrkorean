/**
 * Created by ngocnt on 3/11/2018.
 */
jQuery(document).ready(function () {
    var categoryId = localStorage.getItem("categoryId");
    GetProduct(categoryId);
});
function GetProduct(categoryId) {
    var request = jQuery.ajax({
        type:"GET",
        url:HOST + "admin/category/"+categoryId
    });
    request.done(function (data) {
        jQuery('#category-form').append(CreateForm(data));
    });
}

function CreateForm(item) {

    var form = jQuery('<form></form>');
    form.append(CreateDisableInput('Id',item.Id));
    form.append(CreateInput('Name',item.Name));
    form.append(CreateInputTextarea('Description',item.Description));
    form.append(CreateInput('ParentId',item.ParentId));
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