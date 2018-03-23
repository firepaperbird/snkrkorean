
$(document).ready(function(){
	var blogId = window.localStorage.getItem("blogId");
	GetBlog(blogId);
});

function GetBlog(blogId){
	var request = $.ajax({
		type:'GET',
		url:  HOST + 'post/'+blogId
	});
	request.done(function(data){
		LoadDataToForm(data);
	});
	request.fail(function(data){
		console.log(data);
	});	
}

function LoadDataToForm(blog){
	$("#title").val(blog.Title);
	$("#cover").val(blog.Image);
	$("#summernote").summernote('code',blog.Content);
}

var errorInput = 0;
var validInput=0;
function checkvalid(dv){
    var strleg = dv.value.length;
    jQuery(dv).removeClass('is-invalid');
    jQuery(dv).removeClass('is-valid');
    jQuery(dv).next('.invalid-feedback').remove();
    jQuery(dv).next('.valid-feedback').remove();
    if(strleg<1 || strleg >250){
        jQuery(dv).after( '<div class="invalid-feedback">Field cannot empty</div>' );
        jQuery(dv).addClass('is-invalid');
    }else{
        jQuery(dv).after( '<div class="valid-feedback">Great!</div>' );
        jQuery(dv).addClass('is-valid');
    }
    errorInput= jQuery('body').find('.is-invalid').length;
    validInput= jQuery('body').find('.is-valid').length;
}

var isChangeCover = false;
function changeCover(){
	isChangeCover = true;
}

function UpdateBlog(){
	if(errorInput>0){
        toastr.warning("you must enter Title and Cover");
        return;
    }
	var dataJSON = {
		postId:window.localStorage.getItem("blogId"),
        title:jQuery('#title').val(),
        content:jQuery('#summernote').summernote('code'),
        username:sessionStorage.getItem('mainUse'),
        cover:jQuery('#cover').val(),
        isChangeCover:isChangeCover
    };
    var request = jQuery.ajax({
        type:'POST',
        url: HOST+'post/update',
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        if (data == 'success'){
            window.location.href = '../admin_site/blog.html';
        }
        if (data == 'fail'){
            toastr.error('Add fail!');
        }
    });
    request.fail(function () {
        toastr.error('Add fail!');
    })
} 

function resizeIframe() {
    var obj = document.getElementById('upimg-Frame');
    obj.style.height = ((+obj.contentWindow.document.body.scrollHeight) + 10)+'px';
    setTimeout(resizeIframe, 3000);
}
function Preview(){
	jQuery('#preview').empty();
	jQuery('#preview').append(jQuery('#summernote').summernote('code'));
	jQuery('#preview').css('display','block');
}