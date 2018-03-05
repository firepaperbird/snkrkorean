/**
 * Created by ngocnt on 3/3/2018.
 */
function AddListenerForMenu() {

    $(".menu li").on('click',function () {
        $(".menu li").removeClass("li-actived");
        $(this).attr("class","li-actived");
    })

}
$(document).ready(function () {
    AddListenerForMenu();
})
