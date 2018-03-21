if(sessionStorage.getItem('mainUse')!=null || sessionStorage.getItem('mainUse')!=""){
    sessionStorage.removeItem("mainUse");
}
function login(){
    console.log(HOST);
    var dataJSON = {
        username: jQuery("#email").val(),
        password: jQuery("#password").val()
    }
    var request = jQuery.ajax({
        type:"POST",
        // url: "https://snkrapiv2.azurewebsites.net/user/login",
        url: HOST + "/admin/login",
        dataType: 'json',
        data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true

    });
    request.done(function (data) {
        if (data === "admin" || data === "staff"){
            sessionStorage.setItem("mainUse", jQuery("#email").val());
            window.location.replace("../admin_site/main.html");
        }
    });
}