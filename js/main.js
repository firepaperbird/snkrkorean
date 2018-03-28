window.fbAsyncInit = function() {
    FB.init({
      appId      : '194207037848523',
      cookie     : false,
      xfbml      : true,
      version    : 'v2.12'
    });
    // FB.AppEvents.logPageView();     $(document).trigger('fbload');     
};

    

(function ($) {
  $(document).ready(function(){

    //auto hide navbar
    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       var bottopScroll = $(document).height()-$(window).height(); 
       var moveDistant = Math.abs(lastScrollTop- st) ;
       if(lastScrollTop>=0 && lastScrollTop <=  bottopScroll && moveDistant > 4){
        if (st > lastScrollTop){
             // downscroll code
             $('.navbar').fadeOut();//show nav
         } else {
            // upscroll code
             $('.navbar').fadeIn();
         }
       }       
       // alert(lastScrollTop);
       lastScrollTop = st;
    });

    var us = getCusname();
    if(us!=null){
      $('#login-link').text('Hello, '+us);
      $('#login-link').attr("href", "user.html");
      $('#login-link').css('text-decoration', 'underline');
      $('#signup-link').text('Signout');
      $('#signup-link').attr("href", "#");
      $('#signup-link').css('text-decoration', 'underline');
    }
    updateCartNav();
    //logout
    $('#signup-link').click(function(){
      sessionStorage.removeItem('customer');
      localStorage.removeItem('cartlist');
      localStorage.removeItem('blogId');
      localStorage.removeItem('dealId');
      localStorage.removeItem('pid');
      sessionStorage.removeItem('order');
      FB.logout(function(response) {
        // user is now logged out
      });
      window.location.replace('products.html');
    });
    

});
  }(jQuery));



function getCusname(){
  return JSON.parse(sessionStorage.getItem('customer'));
}
function updateCartNav(){
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
 
function search(t,event){
  var k = event.which || event.keyCode;;
  if(k!=13){
    return;
  }
  window.location.href = 'products.html?cid=-3&search='+$(t).val();
  // alert($(t).val());
  
}

