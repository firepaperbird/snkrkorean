/**
 * Created by ngocnt on 3/10/2018.
 */
function AddListenerForMenu() {
    $(".menu li").on('click',function () {
        $(".menu li").removeClass("li-actived");
        $(this).attr("class","li-actived");
    })
}
var categoryDes = [];
function GetCategories() {
    var request=jQuery.ajax({
        type:"GET",
        url:HOST + "category/all"
    });
    request.done(function (data) {
        if(data!=null){
            CreateListCategory(data);
        }
    });
    request.fail(function (data) {
        console.log("fail " + data);
    })
}

function CreateListCategory(categories){
    var divCategory = $("#categories");
    var categoryAll = CreateCategory('All', 0);
    categoryAll.on('click',function () {
        $(".menu li").removeClass("li-actived");
        $(this).attr("class","li-actived");
    });
    divCategory.append(categoryAll);
    categories.forEach(function (category,index) {
        categoryDes.push({
            id:category.Id,
            des:category.Description
        });
        var item = CreateCategory(category.Name,category.Id);
        divCategory.append(item);
    });
}

function CreateCategory(name, categoryId) {
    var category = $("<li id='"+categoryId+"' class='categoryItem'></li>");
    category.append(name);
    category.on('click',function () {
            $(".menu li").removeClass("li-actived");
            $(this).attr("class","li-actived");
            window.location.href='products.html?cid='+categoryId;
        });
    // category.append('<a href="products.html?cid='+categoryId+'">'+name+'</a>');
    return category;
}

