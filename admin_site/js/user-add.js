function addStaff(){
	if (!validateField()){
		var dataJSON = {
			username:jQuery("#Username").val(),
			password:jQuery("#Password").val(),
			fullname:jQuery("#FullName").val(),
			phone:jQuery("#Email").val(),
			email:jQuery("#Phone").val(),
		}
		var request = jQuery.ajax({
			type:'POST',
			url:HOST + 'admin/add/staff',
			dataType:'json',
			data:dataJSON
		});
		request.done(function(data){
			if (data == "success"){
				window.location.href="../admin_stie/user.html";
			}else{
				toastr.error("Add fail!! Please try again!")
			}
		});
		request.fail(function(data){
			toastr.error("Add fail! Chek your network connection!");
		})
	}
}

function validateField(){
	var username =jQuery("#Username").val();
	var password = jQuery("#Password").val();
	var confirm = jQuery("#Confirm").val();
	var fullname = jQuery("#FullName").val();
	var email = jQuery("#Email").val();
	var phone = jQuery("#Phone").val();

	jQuery("#Username").next().remove();
	jQuery("#Password").next().remove();
	jQuery("#Confirm").next().remove();
	jQuery("#FullName").next().remove();
	jQuery("#Email").next().remove();
	jQuery("#Phone").next().remove();

	var isError = false;
	if (IsOutRange(username,3,50)){
		isError = true;
		jQuery("#Username").parent().append(CreateErrorMessage('Username must have 3-50 characters'))
	}
	if (IsOutRange(password,8,50)){
		isError = true;
		jQuery("#Password").parent().append(CreateErrorMessage('Password must have 8-50 characters'))
	}else{
		if (password != confirm){
			isError = true;
			jQuery("#Confirm").parent().append(CreateErrorMessage('Confirm must match with password'))
		}
	}
	if (fullname != "" && IsOutRange(fullname, 2,50)){
		isError = true;
		jQuery('#FullName').parent().append(CreateErrorMessage('Fullname must have 2-50 characters'));
	}
	
	if (email != "" && IsNotMatch(email,/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/)){
		isError = true;
		jQuery('#Email').parent().append(CreateErrorMessage('Email not valid'));
	}

	if (phone != "" && IsNotMatch(phone, /[0-9-()+]{3,20}/)){
		phone = true;
		jQuery('#Phone').parent().append(CreateErrorMessage('Phone not valid'));
	}
	return isError;
}



function CreateErrorMessage(msg){
	var pTag = jQuery('<p></p>');
	pTag.append(msg);
	pTag.css('color','red');
	return pTag;
}


function CreateOKMessage(msg){
	var pTag = jQuery('<p></p>');
	pTag.append(msg);
	pTag.css('color','green');
	return pTag;
}
