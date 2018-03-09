$("#loginForm").submit(function(event)
{
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: "https://api.xyzcompany.com/users/login.json",
        data:({
            email : $('#email').val(),
            password: $('#password').val()
        }),
        success: function(result)
        {
            if(result=='ok')
            {
                window.location = 'admin_site/index.html'; //just to show that it went through
            }
            else
            {
                $('#result').empty().addClass('error')
                    .append('Something is wrong.');
            }
        }
    });
    return false;
})
function login(){
    console.log(HOST);
    var dataJSON = {  
        username: jQuery("#email").val(),
        password: jQuery("#password").val()
    }
    var request = jQuery.ajax({
        type:"POST",
        // url: "https://snkrapiv2.azurewebsites.net/user/login",
        url: HOST + "/admin/login",
        dataType: 'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
        
    });
    request.done(function (data) {
        if (data === "admin" || data === "staff"){
            window.location.replace("admin_site/index.html");
        }
    });
}