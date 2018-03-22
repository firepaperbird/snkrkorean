function Preview(){
	jQuery('#preview').empty();
	jQuery('#preview').append(jQuery('#summernote').summernote('code'));
	jQuery('#preview').css('display','block');
}
function resizeIframe() {
	var obj = document.getElementById('upimg-Frame');
    obj.style.height = ((+obj.contentWindow.document.body.scrollHeight) + 10)+'px';
    setTimeout(resizeIframe, 3000);
}

var errorInput = 0;
var validInput=0;
function checkvalid(dv){
    var strleg = dv.value.length;
    jQuery(dv).removeClass('is-invalid');
    jQuery(dv).removeClass('is-valid');
    jQuery(dv).next('.invalid-feedback').remove();
    jQuery(dv).next('.valid-feedback').remove();
    if(strleg<1 || strleg >50){
        jQuery(dv).after( '<div class="invalid-feedback">Field cannot empty</div>' );
        jQuery(dv).addClass('is-invalid');
    }else{
        jQuery(dv).after( '<div class="valid-feedback">Great!</div>' );
        jQuery(dv).addClass('is-valid');
    }
    errorInput= jQuery('body').find('.is-invalid').length;
    validInput= jQuery('body').find('.is-valid').length;
}

function AddBlock(){
	if(validInput<5){
        toastr.warning("you must enter Title and Cover");
        return;
    }
	var dataJSON = {
        title:jQuery('#title').val(),
        content:jQuery('#summernote').summernote('code'),
        username:sessionStorage.getItem('mainUse'),
        cover:jQuery('#cover').val()
    };
    var request = jQuery.ajax({
        type:'POST',
        url: HOST+'post/add',
        dataType:'json',
        data:dataJSON
    });
    request.done(function (data) {
        if (data == 'success'){
            window.location.href = '../admin_site/post.html';
        }
        if (data == 'fail'){
            toastr.error('Add fail!');
        }
    });
    request.fail(function () {
        toastr.error('Add fail!');
    })
} 