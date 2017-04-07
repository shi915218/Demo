(function($) {
	var callsum = 0;
	// 调用server javasdk方法
	var callserver = function(serverName, params, callbackName, $this) {
		if (typeof (callbackName) == "undefined") {
			// 设置默认回调方法
			callbackName = serverName.replace("!", "_");
			callbackName = callbackName + '_result';
		}
		// 创建action地址
		serverName = serverName.replace("!", "/");
		var functionname = serverName;
		var actionurl = "/sunproperty-war/" + functionname + "";
		if (typeof params == "undefined") {
			params = {};
		}
		// xmlhttp请求
		// $.toast("正在发起请求。。");
		if ($this != undefined) {
			if ($this.hasClass("disable")) {
				return;
			}
			if ($this != undefined) {
				$this.addClass("disable");
			}
		}
		var ajaxp = {
			url : actionurl,
			data : params,
			type : "POST",
			dataType : "json",
			// contentType : ,
			success : function(rsp) {
				// $.toast("请求返回。。");
				// hh:mm:ss.S"));
				callback(rsp,callbackName);
				if ($this != undefined) {
					$this.removeClass("disable");
				}
			},
			error : function(error) {
				// $.alert("出错了，请刷新重试！"+JSON.stringify(error));
				if ($this != undefined) {
					$this.removeClass("disable");
				}
			}
		};
		if (Object.prototype.toString.call(params) === "[object String]") {
			ajaxp.contentType = "application/json";
		}
		$.ajax(ajaxp);

	};
	// 统一的回调方法
	var callback = function(data, callbackName) {
		// 调用回调函数
		if (typeof (callbackName) == "function") {// 如果是函数对象直接回调
			callbackName(data);
		} else {// 是函数名称
			var fun;
			try {
				// 获取函数名称所指向函数对象
				fun = eval(callbackName);
			} catch (e) {
				alert('回调函数' + callbackName + '未定义');
				return;
			}
			if (typeof (fun) == "function") { // 不是函数
				fun(data);
			} else {
				alert('回调函数' + callbackName + '未定义');
			}
		}
	};
	// 判断用户是否拥有该功能权限
	/*
	 * var havepermission = function(serverName) {// 修改 // 是否有前缀 // senior前缀付费功能
	 * if (serverName.startWith('senior')) { if (qn_User.isPaid()) { return
	 * true; } else { return false; } }
	 * 
	 * return true; };
	 */
	var reference = function() {
		var arg = arguments[0];
		// 参数
		var serverName = arg.serverName;// 名称
		var params = arg.params;// 参数
		var callbackName = arg.callback;// 回调函数或名称
		var operatebtn = arg.operatebtn;// 回调函数或名称
		// var reqtype = arg.reqtype;// 回调函数或名称

		callserver(serverName, params, callbackName, operatebtn);
	};
	// $["reference"] = reference;
	// $["callback"] = callback;

	$.extend({
		reference : reference,
		callback : callback
	});
})($);
