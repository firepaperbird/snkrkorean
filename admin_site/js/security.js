if(sessionStorage.getItem('mainUse')==null || sessionStorage.getItem('mainUse')==""){
	window.location.replace("../admin_site");
}
function logout(){
	sessionStorage.removeItem("mainUse");
	window.location.replace("../admin_site");
}