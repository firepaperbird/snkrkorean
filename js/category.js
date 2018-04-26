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
function GetCategories(id) {
    var request=jQuery.ajax({
        type:"GET",
        url:HOST + "category/all"
    });
    request.done(function (data) {
        if(data!=null){
            CreateListCategory(data,id);
            if(id != undefined && id!= '0' ){
                getChillByParent(getUrlVars()["cid"],id);
            }
        }
    });
    request.fail(function (data) {
        console.log("fail " + data);
    })
}
var chills = [];
function CreateListCategory(categories,selectedCategory){
    var divCategory = $("#categories");
    var categoryAll = CreateCategory('All', 0);
    

    divCategory.append(categoryAll);
    categories.forEach(function (category,index) {
        categoryDes.push({
            id:category.Id,
            des:category.Description
        });
        if(category.ParentId>0){
            chills.push({
                id:category.Id,
                name:category.Name,
                parent:category.ParentId,
            });
        }else{
            var item = CreateCategory(category.Name,category.Id, selectedCategory);
            divCategory.append(item);
        }
        
    });

}
function putChild(parentId,childList,selectId){
    if(childList!=null && childList != 'undefined'){
        childList.forEach(function(item){
            $('ul #'+parentId+'>ul').append(CreateCategoryChild(item.Name, item.Id, parentId,selectId));
        });     
    }    
}
function getChillByParent(parentId,selectId){
    if(parentId!=0){
        var request=jQuery.ajax({
            type:"GET",
            dataType: 'json',
            url:HOST + "category/sub?id="+parentId,
        });
        request.done(function (data) {
            console.log(data);
            putChild(parentId,data,selectId);
        });
        request.fail(function(data){
            console.log('FF'+data);
        });
    }
    
    
}

function CreateCategoryChild(name, categoryId, parentId,selectId){
    var category = $("<li id='"+categoryId+"' class='categoryItem'></li>");
    category.append('<a href="products.html?subid='+categoryId+'&cid='+parentId+'">'+name+'</a>');
    if (categoryId == selectId){
        category.attr("class","li-actived");
    }
    category.append('<ul></ul>');
    return category;
}
function CreateCategory(name, categoryId, selectedCategory) {
    var category = $("<li id='"+categoryId+"' class='categoryItem'></li>");
    var alink = $('<a href="products.html?cid='+categoryId+'">'+name+'</a>');
    if (categoryId == selectedCategory){
        alink.attr("class","li-actived");
    }
    category.append(alink);     
    category.append('<ul></ul>');
    
    // category.on('click',function () {
    //        window.location.href='products.html?cid='+categoryId;
    //     });
    // // category.append('<a href="products.html?cid='+categoryId+'">'+name+'</a>');
    return category;
}
