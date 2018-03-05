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
   var request = jQuery.ajax({
        type:"get",
       dataType:"json",
        url: "http://snkrshopapi.azurewebsites.net/category/all",

       cache: false

    });
    request.done(function (data) {
        console.log("thanh cong");
        console.log(data);
    });
    request.fail(function (data) {
        console.log("fail roi");
    });

}