function SignUp(){
	var isError = false;
	var username  = jQuery('#username').val();
	var phone  = jQuery('#phone').val();
	var fullname  = jQuery('#fullname').val();
	// var fullname = '';
	var password  = jQuery('#password').val();
	var repassword  = jQuery('#repassword').val();
	var email  = jQuery('#email').val();
	var address  = jQuery('#address').val();
	if (IsOutRange(username,6,50)){
		isError = true;
		toastr.error('Username must have 6 to 50 character');
		return;
	}
	if (IsEmpty(fullname)){
		isError = true;
		toastr.error('fullname can\'t be empty');
		return;
	}
	if (IsEmpty(password) || IsOutRange(password,8,50)){
		isError = true;
		toastr.error('Password must have 8-50 character');
		return;
	}
	if (!password == repassword){
		isError = true;
		toastr.error('RePassword must same with password');
		return;
	}
	if (!validateEmail(email) && email == ''){
		isError = true;
		toastr.error('Email not valid');
		return;
	}
	if (!validatePhone(phone) && phone != ''){
		isError = true;
		toastr.error('phone not valid');
		return;
	}
	var dataJson = {
		username: username,
		password: password,
		fullname: fullname,
		phone: phone,
		email:email,
		address:address
	}

	var request = jQuery.ajax({
		type:'POST',
		url:HOST + 'user/register',
		dataType:'json',
		data:dataJson
	});
	request.done(function(data){
		if (data == 'success'){
			window.location.href ='signup-done.html';
		}else{
			alert('Username exist already')
			jQuery('#username').focus();
		}
	});
	request.fail(function(data){
		alert('register fail')
	})

}

function IsEmpty(text){
    if (text.length <= 0){
        return true;
    }
    return false;
}

function IsOutRange(text,min,max){
    if (text.trim().length < min || text.trim().length > max){
        return true;
    }
    return false;
}

function IsNotValidNumber(text,min,max){
    var regex = /[1-9][0-9]{0,5}/;
    if (!regex.test(text)){
        return true;
    }
    console.log(parseInt(text));
    if (parseInt(text) < min || parseInt > max){
        return true;
    }
    return false;
}

function IsNotMatch(text,regex){
    return !regex.test(text);
}

 function validateEmail($email) {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test( $email );
    }

     function validatePhone($phone) {
      var phoneReg = /[0-9-()+]{3,20}/;
      return phoneReg.test( $phone );
    }