/*
	** 控件类 **
	*** 错误信息提示
	*** 吐丝{
		loading:显示loading
		infor:显示提示信息
	}
	*** confirm
*/
var globalWidgt = {
    error: function(s) {
        if (!this.toptips) {
            this.toptips = document.createElement('div');
            this.toptips.className = 'weui_toptips weui_warn js_tooltips';
            this.append(this.toptips);
        }
        this.toptips.innerHTML = s;
        this.toptips.style.display = 'block';
        this.errorTimer && clearTimeout(this.errorTimer);
        this.errorTimer = setTimeout(function() {
            globalWidgt.toptips.style.display = 'none';
        }, 3e3);
    },
    toast: function(type, status, msg) {
        function toastContent(s) {
            return '<p class="weui_toast_content">' + s + '</p>';
        };
        var loading = '<div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div>'
        var infor = '<i class="weui_icon_toast"></i>';
        if (!this._toast) {
            this._toast = document.createElement('div');
            this._toast.innerHTML = '<div class="weui_mask_transparent"></div><div class="weui_toast"></div>';
            this.append(this._toast);
        };
        if (status) {
            var content = this._toast.querySelector('.weui_toast');
            switch (type) {
                case 'loading':
                    this._toast.className = 'weui_loading_toast';
                    content.innerHTML = loading + toastContent(msg);
                    break;
                default:
                    this._toast.className = '';
                    content.innerHTML = infor + toastContent(msg);
                    var _toast = this._toast;
                    setTimeout(function(){
                       _toast.style.display = 'none';
                    },1e3);
                    break;
            };
            this._toast.style.display = 'block';
        } else {
            this._toast.style.display = 'none';
        }
    },
    alert: function() {},
    confirm: function(msg, callback) {
        if (!this.dialogConfirm) {
            this.dialogConfirm = document.createElement('div');
            this.dialogConfirm.className = 'weui_dialog_confirm';
            this.dialogConfirm.innerHTML = '<div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">\u5361\u8f66\u4e4b\u5bb6\u6e29\u99a8\u63d0\u793a</strong></div><div class="weui_dialog_bd confirm-content">empty</div><div class="weui_dialog_ft"><a href="javascript:;" class="weui_btn_dialog default">\u53d6\u6d88</a><a href="javascript:;" class="weui_btn_dialog primary">\u786e\u5b9a</a></div></div>'
            this.append(this.dialogConfirm);
            this.dialogConfirm.addEventListener('click', function(e) {
                var target = e.target;
                if (target.tagName == 'A') {
                    if(target.classList.contains('primary') && callback && Function.isFunction(callback)){
                        callback();
                    }
                    globalWidgt.dialogConfirm.style.display = 'none';
                }
            });
        };
        this.dialogConfirm.querySelector('.confirm-content').innerHTML = msg;
        this.dialogConfirm.style.display = 'block';
    },
    append: function(d) {
        document.body.appendChild(d);
    }
};
