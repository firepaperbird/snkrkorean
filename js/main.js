window.fbAsyncInit = function() {
    FB.init({
      appId      : '194207037848523',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.12'
    });
    $(document).trigger('fbload');  
    // FB.AppEvents.logPageView();         
};
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


(function ($) {
  $(document).ready(function(){

    //auto hide navbar
    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       if (st > lastScrollTop){
           // downscroll code
           $('.navbar').fadeOut();
       } else {
          // upscroll code
           $('.navbar').fadeIn();
       }
       lastScrollTop = st;
    });

    var us = getCusname();
    if(us!=null){
      $('#login-link').text('Hello, '+us);
      $('#login-link').attr("href", "user.html");
      $('#login-link').css('text-decoration', 'underline');
      $('#signup-link').text('Sigout');
      $('#signup-link').attr("href", "#");
      $('#signup-link').css('text-decoration', 'underline');
    }
    updateCart();
    $('#signup-link').click(function(){
      sessionStorage.removeItem('customer');
      localStorage.removeItem('cartlist');
      localStorage.removeItem('blogId');
      localStorage.removeItem('dealId');
      localStorage.removeItem('pid');
      sessionStorage.removeItem('order');
      window.location.replace('products.html');
    });

    
    checkFbLoop();

});
  }(jQuery));

function checkFbLoop(){
            // console.log('loop');  //
            setTimeout(function() {checkFbLoop();}, 4000);
            $(document).trigger('fbload');
        }

function getCusname(){
  return JSON.parse(sessionStorage.getItem('customer'));
}
function updateCart(){
  if( localStorage.getItem('cartlist')!='undefined'){
    var storedAry = JSON.parse(localStorage.getItem('cartlist'));
  }else{
    localStorage.removeItem('cartlist');
  }
  var num;
  if (storedAry==null){
    num=0;
  }else{
      num=storedAry.length;
  }
  $('.user-cart').text('Cart ('+num+')');
}
 


$(document).on(
    'fbload',  //  <---- HERE'S OUR CUSTOM EVENT BEING LISTENED FOR
    function(){
      if(getCusname()==null){
        FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          FB.api('/me',{ access_token : response.authResponse.accessToken }, {fields:"id,name,email"}, function(response) {
            console.log(response);
            console.log(response.authResponse.accessToken);
            
            var dataJson = {
              id:response.id,
              accessToken:response.authResponse.accessToken,
              name:response.name
            }
            var request = $.ajax({
              type:'POST',
              url:HOST + 'user/login/facebook',
              dataType:'json',
              data:dataJson
            });

            request.done(function(){
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
      }); 
      }
    }
);

function search(t,event){
  var k = event.which || event.keyCode;;
  if(k!=13){
    return;
  }
  window.location.href = 'products.html?cid=-3&search='+$(t).val();
  // alert($(t).val());
  
}