/**
 * Created by ngocnt on 3/10/2018.
 */

$(document).ready(function () {
    AddListenerForMenu();
    GetCategories();
    // console.log(getUrlVars()["id"]);
    moveCategory();
});
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var storedAry;
$( ".btn-add-cart" ).click(function() {
    var cookieValue = getCookie("snkrcrt");
    var dataJSON = {
                        id: getUrlVars()["id"],
                        quantity: $('.custom-select :selected').text()
                    }
    if(cookieValue.length!=0){
        storedAry = JSON.parse(cookieValue);        
        additem(dataJSON);
    }else{
        storedAry=[dataJSON];
    }
    setCookie("snkrcrt",JSON.stringify(storedAry),1);
    toastr.success("add to cart success");
    // alert( "add success ID: "+ getUrlVars()["id"])
});

function additem(item){
    for (var i = 0; i < storedAry.length; i++) {
        if(storedAry[i].id == item.id){
            storedAry[i].quantity=0+ (+storedAry[i].quantity)+(+item.quantity);
            // alert( "array length: "+ storedAry.length);
            return;
        }
    }
    storedAry.push(item);
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// move category to bottom off web when sm device
function moveCategory(){
    if($('body').width() < 989){
        $('#category').each(function() {
            $(this).insertAfter($(this).parent().find('.item'));
        });
    }
}

