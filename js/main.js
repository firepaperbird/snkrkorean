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
});
  }(jQuery));

$(document).ready(function() {
  var us = getCusname();
  if(us!=null){
    $('#login-link').text('Hello, '+us);
    $('#login-link').attr("href", "user.html");
    $('#login-link').css('text-decoration', 'underline');
    $('#signup-link').text('Sigout');
    $('#signup-link').attr("href", "#");
    $('#signup-link').css('text-decoration', 'underline');
  }
});

function getCusname(){
  return JSON.parse(sessionStorage.getItem('customer'));
}