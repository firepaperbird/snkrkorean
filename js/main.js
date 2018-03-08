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