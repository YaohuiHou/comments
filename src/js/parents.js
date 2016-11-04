// 为HTML原型扩展一个寻找祖先元素的方法
HTMLElement.prototype.parents = function(p){
    var target,t = this;
    while((t = t.parentNode) && t.nodeType !== 9){
        if(t.nodeType === 1){
            if(t.tagName.toLowerCase() === p){
                target = t;
                break;
            }else if(p.startsWith('.') && t.classList.contains(p.replace(/\./,''))){
                target = t;
                break;
            }else if(p.startsWith('#') && '#' + t.id === p){
                target = t;
                break;
            }
        }
    };
    return target;
};
