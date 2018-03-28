function addstyle(str)
      {
        document.getElementById('style').href='css/'+str;
      }
function goToByScroll(){
      // Scroll
    // $('html,body').animate({ scrollTop: 70} ,'slow');
}
function userLogin() {

    console.log(HOST);
    var dataJSON = {
        username: jQuery("#username").val(),
        password: jQuery("#password").val()
    }
    var request = jQuery.ajax({
        type:"POST",
        url: HOST + "/user/login",
        dataType: 'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true

    });
    request.done(function (data) {
        if (data != "fail"){
            document.cookie = "token="+data;
            writteUN(jQuery("#username").val());
            if(sessionStorage.getItem('isCheckout')!=null){
                window.location.replace("cart.html");   
                sessionStorage.removeItem('isCheckout');
            }else{
                window.location.replace("products.html");   
            }
        }
    });
    request.fail(function (data) {
       console.log(data);
    });

}
function writteUN(item){
    sessionStorage.setItem('customer', JSON.stringify(item));
}
function getCusname(){
  return JSON.parse(sessionStorage.getItem('customer'));
}
$(document).ready(function() {
    if(getCusname()!=null){
        window.history.back();
    }

    // $('.fb-login-button').on('click',function(){
    //     checkFbLoop();
    // });
});

// function checkFbLoop(){
//             setTimeout(function() {checkFbLoop();}, 5000);
//             // $('.btn-private').trigger('fload');
//             console.log('loop ' + (new Date()).getTime()); 
//             checkFbLoged();
//         }

function checkFbLoged(response){

          var token = response.authResponse.accessToken;
          FB.api('/me',{ access_token : token }, {fields:"id,name,email"}, function(response) {
            console.log(response);
            console.log(token);
            
            var dataJson = {
              id:response.id,
              accessToken:token,
              name:response.name
            }
            var request = $.ajax({
              type:'POST',
              url:HOST + 'user/login/facebook',
              dataType:'json',
              data:dataJson
            });

            request.done(function(data){
              writteUN(response.name);
              document.cookie = "token="+data;
              window.location.href = '../products.html';
            });
            request.fail(function(){
              toastr.error("Login facebook fail!");
            })

            //response.id lam id
            //cho nay lay accessToken lam pass
            //kiem tra xem user ton tai chua, ton tai thi login, ko ton tai thi` register cho user nay
          });
 
}        
function makeFbLogin(){
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         checkFbLoged(response);
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    });
}