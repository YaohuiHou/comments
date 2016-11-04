var topicComment = new commentWidget({
    "callback":function(){

    }
});
var comments_list = document.querySelector('#comments_list');
comments_list.addEventListener('click',function(e){
    var target = e.target;
    if(target.tagName == 'SPAN' && target.className == 'reply')
    topicComment.onFocusHandle(target.parents('li').querySelector('.nickname').innerHTML);
});
