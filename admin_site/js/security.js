if(sessionStorage.getItem('mainUse')==null || sessionStorage.getItem('mainUse')==""){
	window.location.replace("../admin_site");
}
function logout(){
	sessionStorage.removeItem("mainUse");
	localStorage.removeItem('cartlist');
	localStorage.removeItem('dealId');
	localStorage.removeItem('blogId');
	window.location.replace("../admin_site");
}