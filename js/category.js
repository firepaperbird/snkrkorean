/**
 * Created by ngocnt on 3/10/2018.
 */
function AddListenerForMenu() {
    $(".menu li").on('click',function () {
        $(".menu li").removeClass("li-actived");
        $(this).attr("class","li-actived");
    })
}

function GetCategories() {
    var request=jQuery.ajax({
        type:"GET",
        url:HOST + "category/all"
    });
    request.done(function (data) {
        console.log(data);
        CreateListCategory(data);
    });
    request.fail(function (data) {
        console.log("fail " + data);
    })
}

function CreateListCategory(categories){
    var divCategory = $("#categories");
    divCategory.append(CreateCategory('All', 0));
    categories.forEach(function (category,index) {
        console.log(category);
        var item = CreateCategory(category.Name,category.Id);
        item.on('click',function () {
            $(".menu li").removeClass("li-actived");
            $(this).attr("class","li-actived");
        });
        divCategory.append(item);
    });
}

function CreateCategory(name, categoryId) {
    var category = $("<li id='"+categoryId+"'></li>");
    category.append(name);
    return category;
}