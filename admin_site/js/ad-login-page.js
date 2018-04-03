if(sessionStorage.getItem('mainUse')!=null || sessionStorage.getItem('mainUse')!=""){
    sessionStorage.removeItem("mainUse");
}
function login(){
    // console.log(HOST);
    var dataJSON = {
        username: jQuery("#email").val(),
        password: jQuery("#password").val()
    }
    var request = jQuery.ajax({
        type:"POST",
        url: HOST + "/admin/login",
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true

    });
    request.done(function (data) {
        console.log(data);
        
        if (data != "fail"){
            // document.cookie = "token="+data;
            sessionStorage.setItem("mainUse", jQuery("#email").val());
            window.location.replace("../admin_site/");
        }else{
            toastr.error("Login fail!");
        }
    });
    
    request.fail(function(data){
        toastr.error("Login fail!");
    });
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        login();
    }
});