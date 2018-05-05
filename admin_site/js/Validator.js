/**
 * Created by ngocnt on 3/17/2018.
 */
function IsEmpty(text){
    if (text.trim().isEmpty()){
        return true;
    }
    return false;
}

function IsOutRange(text,min,max){
    if (text.trim().length < min || text.trim().length > max){
        return true;
    }
    return false;
}

function IsNotValidNumber(text,min,max){
    var regex = /[1-9][0-9]{0,5}/;
    if (!regex.test(text)){
        return true;
    }
    console.log(parseInt(text));
    if (parseInt(text) < min || parseInt(text) > max){
        return true;
    }
    return false;
}

function IsNotMatch(text,regex){
    return !regex.test(text);
}

