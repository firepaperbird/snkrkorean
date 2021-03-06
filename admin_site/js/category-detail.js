/**
 * Created by ngocnt on 3/11/2018.
 */
jQuery(document).ready(function () {
    var categoryId = window.localStorage.getItem("categoryId");
    window.localStorage.removeItem("categoryId");
    GetCategory(categoryId);
});
function GetCategory(categoryId) {
    var request = jQuery.ajax({
        type: "GET",
        url: HOST + "admin/category/" + categoryId
    });
    request.done(function (data) {
        jQuery('#category-form').append(CreateForm(data));
    });
}

function CreateForm(item) {

    var form = jQuery('<div></div>');
    form.append(CreateDisableInput('Mã-코드', "Id", item.Id));
    form.append(CreateInput('Tên-상품이름', "Name", item.Name));
    form.append(CreateInputTextarea('Mô tả-설명', "Description", item.Description));
    form.append(CreateSelect('Danh mục cha', "ParentId", item.ParentId));
    form.append(CreateUpdateButton());
    return form;
}


function CreateDisableInput(name, id, data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='" + id + "'>" + name + ":</label>");
    var input = jQuery("<input type='text' class='form-control' id='" + id + "' value='" + data + "' name='" + id + "' disabled>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateInput(name, id, data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='" + id + "'>" + name + ":</label>");
    var input = jQuery("<input type='text' class='form-control' id='" + id + "' value='" + data + "' name='" + id + "'>");
    div.append(label);
    div.append(input);
    return div;
}

function CreateInputTextarea(name, id, data) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='" + id + "'>" + name + ":</label>");
    var input = jQuery("<textarea type='text' class='form-control' rows='5' id='" + id + "' name='" + id + "'></textarea>");
    input.append(data);
    div.append(label);
    div.append(input);
    return div;
}

function CreateSelect(name, id, selectedItemValue) {
    var div = jQuery('<div class="form-group"></div>');
    var label = jQuery("<label for='" + id + "'>" + name + ":</label>");
    var select = jQuery("<select class='form-control' id='" + id + "' name='" + id + "'>");

    var isSelected = false;
    var request = jQuery.ajax({
        type: "GET",
        url: HOST + "category/all",
    });
    request.done(function (data) {
        data.forEach(function (item) {
            if(item.ParentId==0)
            {
                if (item.Id == selectedItemValue) {
                    isSelected = true;
                    select.append(CreateOptionSelected(item.Id, item.Name));
                } else {
                    select.append(CreateOption(item.Id, item.Name));
                }
            }
        });
        if (isSelected) {
            select.append(CreateOption(0, 'None'));
        } else {
            select.append(CreateOptionSelected(0, 'None'));
        }
    });
    request.fail(function (data) {
        console.log("fail roi");
        if (isSelected) {
            select.append(CreateOption(0, 'None'));
        } else {
            select.append(CreateOptionSelected(0, 'None'));
        }
    });

    div.append(label);
    div.append(select);
    return div;
}

function CreateOption(value, data) {
    var option = jQuery('<option value="' + value + '"></option>');
    option.append(data);
    return option;
}

function CreateOptionSelected(value, data) {
    var optionSelected = CreateOption(value, data);
    optionSelected.attr('selected', 'selected');
    return optionSelected;
}

function CreateUpdateButton() {
    var button = jQuery('<button class="btn btn-primary btn-lg" onclick="updateCategory()">Cập nhật</button>');
    return button;
}


function updateCategory() {
    jQuery('#Name').next('p').remove();
    jQuery('#Description').next('p').remove();

    var id = jQuery('#Id').val();
    var name = jQuery('#Name').val();
    var description = jQuery('#Description').val();
    var parentId = jQuery('#ParentId').val();
    var isError = false;
    console.log(name);
    console.log(description);
    if (IsOutRange(name, 1, 50)) {
        jQuery('#Name').parent().append('<p style="color:red">  Name length must from 1 to 50 characters</p>')
        isError = true;
    }
    if (IsOutRange(description, 0, 150)) {
        jQuery('#Description').parent().append('<p style="color:red">  Description length must from 1 to 150 characters</p>')
        isError = true;
    }
    console.log(isError);
    if (isError) {
        return;
    }

    var dataJSON = {
        id: id,
        name: name,
        description: description,
        parentId: parentId,
        token:getCookie('token')
    };
    var request = jQuery.ajax({
        type:'POST',
        url: HOST+'category/update',
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        if (data == 'success'){
            window.location.href = 'category.html';
        }
        if (data == 'fail'){
            toastr.error('Update fail!');
        }
    });
    request.fail(function () {
        toastr.error('Update fail!');
    })
}
