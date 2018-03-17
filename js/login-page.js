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
        if (data == "success"){
            writteUN(jQuery("#username").val());
            window.location.replace("products.html");
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
// $(document).ready(function() {
//   $.ajaxSetup({ cache: true });
//   $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
//     FB.init({
//       appId: '{your-app-id}',
//       version: 'v2.7' // or v2.1, v2.2, v2.3, ...
//     });     
//     $('#loginbutton,#feedbutton').removeAttr('disabled');
//     FB.getLoginStatus(updateStatusCallback);
//   });
// });