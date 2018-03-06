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
    var dataJSON = {  
        username: "ngoc",
        password: "123"
    } 
    var request = jQuery.ajax({
        type:"POST",
        url: "https://snkrapiv2.azurewebsites.net/user/login",
        dataType: 'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true,
        success: function (msg) {
                        returnVal = msg;
                    },
    }); request.done(function (data) {
        console.log("thanh cong ssss");
        console.log(data);
    });
}