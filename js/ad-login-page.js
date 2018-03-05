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
   var request = $.ajax({
        type:"GET",
        url: "http://10.82.250.100:8082/category/all",
        // data:{
        //   username : $("#email").val(),
        //     password: $("#password").val()
        // },
        cache:false,
       headers: {
           'Access-Control-Allow-Origin': '*'
       }
    });
    request.done(function (data) {
        console.log("thành công rồi");
        console.log(data);
    });
    request.fail(function (msg) {
        console.log("fail rồi");
        console.log(msg);
    });
}