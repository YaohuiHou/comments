// 评论 || 回复
function commentWidget(options) {
    this.defaults = {
        "selector": document.querySelector('#comment'),
        "counter": null,
        "emojiclassName": "emoji",
        "emojiSelector": document.querySelector('#emoji'),
        "message": "message",
        "callback":null
    };
    for (var i in options) {
        this.defaults[i] = options[i]
    };
    this.generate(); 
};
commentWidget.prototype = {
    generate: function() {
        var selector = this.defaults['selector'],
            me = this;
        this.message = selector.elements[this.defaults['message']];
        this.callback = this.defaults['callback'];
        /*
            预留计数器方法
            this.tally();
        */
        selector.addEventListener('click', function(e) {
            var target = e.target;
            if (target.classList.contains(me.defaults['emojiclassName'])) {
                me.toggleEmoji(target);
            }else if (target.dataset['title'] || target.parentElement.dataset['title']) {
                me.insert(target);
            }
        });
        selector.addEventListener('submit', function(e) {
            me.submit(e);
        });
        this.message.addEventListener('input', function(e) {
            me.enabled();
        });
    },
    init: function() { // 初始化
        this.message.value = '';
        this.message.blur();
        this.defaults['counter'] && (this.defaults['counter'].innerHTML = 0);
        this.defaults['emojiSelector'].classList.remove('visible');
        if(this.emojibtn && this.emojibtn.classList.contains('selected')){
            this.emojibtn.classList.remove('selected');
        }
    },
    onFocusHandle:function(nickname){               // 获取焦点
        this.init();
        if(nickname)
        this.message.value = '\u56de\u590d ' + nickname + '：';
        this.message.focus();
    },
    toggleEmoji: function(target) {                 // 打开/关闭表情
        var emojiSelector = this.defaults['emojiSelector'];
        target.classList.toggle('selected');
        emojiSelector.classList.toggle('visible');
        emojiSelector.firstElementChild.refresh && emojiSelector.firstElementChild.refresh();
        !this.emojibtn && (this.emojibtn = target);
    },
    insert: function(target) { // 插入表情
        if(target.tagName == 'I')
        target = target.parentElement;
        var counter = this.defaults['counter'],title = target.dataset['title'];
        if(this.message.value.length + title.length > 500) return;
        this.message.value += title;
        this.enabled();
        /*
        if (counter)
        counter.innerHTML = this.message.value.length;
        */
    },
    tally: function() {                 // 预留计数方法
        var me = this;
        counter = this.defaults['counter'];
        this.message.addEventListener('input', function(e) {
            counter && (counter.innerHTML = this.value.length);
            me.enabled();
        });
    },
    enabled: function() {               // 激活提交按钮
        var submit = this.defaults['selector'].querySelector('input[type="submit"]');
        if (submit)
        submit.disabled = this.message.value.trim().bytes >= 4 ? false : true;
    },
    submit: function(e) {           // 发表
        e.preventDefault();
        var me = this,
            form = this.defaults['selector'],
            submit = form.querySelector('input[type="submit"]');
        submit.disabled = true;
        globalWidgt.toast('loading',true,'\u53d1\u8868\u4e2d\uff0c\u8bf7\u7a0d\u540e');
        $.ajax({
            type:form.method,
            url:form.action,
            data:form.data,
            dataType:'json',
            success:function(res){
                if(res){
                    globalWidgt.toast('loading',false);
                    switch (res.status) {
                        case 1:
                            globalWidgt.toast('infor',true,'\u53d1\u8868\u6210\u529f\uff01'); // 发表成功!
                            me.callback && Function.isFunction(me.callback) && me.callback(res.data);
                            me.init();
                            break;
                        case 2:
                            globalWidgt.error('\u4eb2\uff0c\u60a8\u7684\u8d26\u53f7\u5df2\u88ab\u7981\u8a00'); // 亲，您的账号已被禁言
                            me.init();
                            break;
                        default:
                            submit.disabled = false;
                            globalWidgt.error('\u53d1\u8868\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5') // 发表失败，请稍后重试
                    };
                };
            },
            error:function(){
                globalWidgt.toast('loading',false);
                globalWidgt.error('\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5') // 网络不给力，请稍后重试
            }
        })
    }
};
