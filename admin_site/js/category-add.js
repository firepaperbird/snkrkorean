/**
 * Created by ngocnt on 3/17/2018.
 */
jQuery(document).ready(function () {
    GetListCategory();
});

function GetListCategory() {
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "category/all",
    });
    request.done(function (data) {
        CreateOptionParentCategory(data);
    });
    request.fail(function (data) {
        console.log("fail roi");
    });
}

function CreateOptionParentCategory(categories) {
    categories.forEach(function (category) {
        jQuery('#ParentId').append('<option value="'+category.Id+'">'+category.Name+'</option>')
    });
}

function addCategory() {
    jQuery('#Name').next('p').remove();
    jQuery('#Description').next('p').remove();

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
        name: name,
        description: description,
        parentId: parentId,
        token:getCookie('token')
    };
    var request = jQuery.ajax({
        type:'POST',
        url: HOST+'category/add',
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        if (data == 'success'){
            window.location.href = 'category.html';
        }
        if (data == 'fail'){
            toastr.error('Add fail!');
        }
    });
    request.fail(function () {
        toastr.error('Add fail!');
    })
}