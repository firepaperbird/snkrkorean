/**
 * Created by ngocnt on 3/10/2018.
 */
function AddListenerForMenu() {

    $(".menu li").on('click',function () {
        $(".menu li").removeClass("li-actived");
        $(this).attr("class","li-actived");
    })

}
function GetCategory() {
    var request=jQuery.ajax({
        type:"GET",
        url:HOST + "category/all",
    });
    request.done(function (data) {
        var category = $("#categories");
    });
}