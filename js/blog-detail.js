$(document).ready(function () {
    GetAPost();
});
function GetAPost(){
    var data = getUrlVars()["id"];
    var request = jQuery.ajax({
        type:"GET",
        url: HOST + "/post/"+data,
        dataType:'json',
        // data:dataJSON,
        header: {"Access-Control-Allow-Origin":true},
        traditional: true
    });
    request.done(function (data) {
        // console.log(data);
        CreateItem(data);
    });
    request.fail(function (data) {
       console.log("fail roi");
    });
}

function  CreateItem(thispost) {
    var list = $("#container");
    var imgContainer=$('<div class="img-container"></div>');
    var img = $('<img class="top-img-cover" src="'+thispost.Image+'"></img>');
    imgContainer.append(img);
    var title = $('<h1 class="title">'+thispost.Title+'</h1>');
    var content = $('<div class="post-content">'+thispost.Content+'</div>');
    var author = $('<p class="author">'+thispost.UserId+'</p>');
    // fix container height bug
    list.append(imgContainer);
    list.append(title);
    list.append(content);
    list.append(author);
    var x = $('<div style="clear: both;"></div>');
    list.append(x);
}
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