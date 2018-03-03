/**
 * Created by ngocnt on 3/3/2018.
 */
function AddListenerForButton() {
    SetButtonProfileActive();
    $("#left-site > input").on('click', function () {

        ChangeToActive($(this));
        ShowRightItem($(this));

    });
}

function SetButtonProfileActive() {
    $("#btn-profile").css("background-color", "#ffffff");
    $("#btn-profile").css("border", "1px solid #707070");
    $("#btn-profile").css("color", "black");
}

function ChangeToActive(item){
    $("#left-site > input").css("background-color", "transparent");
    $("#left-site > input").css("border", "1px solid #ffffff");
    $("#left-site > input").css("color", "#ffffff");

    item.css("background-color", "#ffffff");
    item.css("border", "1px solid #707070");
    item.css("color", "black");

}

function ShowRightItem(button) {
    $("#right-site > div").css("display","none");
    if(button.val() == "Profile"){

        $("#profile").css("display","block");
    }
    if(button.val() == "Change Password"){

        $("#change-password").css("display","block");
    }
}

$(document).ready(function () {
    AddListenerForButton();
})