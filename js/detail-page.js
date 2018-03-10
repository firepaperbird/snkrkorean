/**
 * Created by ngocnt on 3/10/2018.
 */

$(document).ready(function () {
    AddListenerForMenu();
    GetCategories();
    console.log(getUrlVars()["id"]);
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