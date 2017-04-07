$(function() {
	var toFixed = function(num) {
		num=parseFloat(num);
		if (num % 1 == 0) {
			return num.toFixed(0);
		}else if(num*10 % 1 == 0)
		{
			return num.toFixed(1);
		}
		else {
			return num.toFixed(2);
		}
	}
	var detail = {
		init : function() {
			$('input, textarea').placeholder();
			$(".btn_all").addClass("active");
			$(".btn_default").addClass("active");
			this.skippr();
			this.getRelated();
			this.bind();
			this.sortBind();
			this.scrollBind();

			// 这里写自动滚动到房源
			var hash = location.hash;
			if (hash.indexOf("type=resource") > 0) {
				$(".tag li[value=houseLend]").click();
			}
		},
		pie : function(objs) {
			try
			{
				objs.backgroundcover({safearea: "50%,50%,50%,50%"});
			}catch (e){}
		},
		bind : function() {
			$(".searchdiv a").click(
					function(e) {
						var value = $(".searchdiv input").val();
						if (value != "") {
							var url = "http://" + window.location.host
									+ '/sunproperty-war/portals/index.do';
							url += "?keyword=" + value;
							window.location.href = url;
						}
					});
			$(".statusDiv").on("click", "a", function(e) {
				$(".statusDiv a").removeClass("active");
				var btn = $(e.currentTarget);
				btn.addClass("active");
				var params = detail.getParams();
				page = 1;
				params.page = page;
				detail.referenceFun(params);
			});
			// 加载下一页
			var page = 1
			$(".houseLend_detail_more").click(function() {
				var params = detail.getParams();
				params.page = ++page;
				detail.referenceFun(params);
			});
			$(".leftdown").click(function() {
				detail.othersrc("left");
			});
			$(".rightdown").click(function() {
				detail.othersrc("right");
			});
		},
		skippr : function() {
			var psum = $("#theTarget").attr("value");
			if (psum == 1 || psum == "" || psum == null || psum == 0) {
				$("#theTarget").skippr({
					arrows : false,
					childrenElementType : 'div'
				});
			} else {
				$("#theTarget").skippr({
					childrenElementType : 'div'
				});
			}
			this.pie($('.skippr > div'));
		},
		scrollBind : function() {
			$(".tag_houseIntroduce").on("click", function() {
				$(this).addClass("active");
			});

			// 获取要定位元素距离浏览器顶部的距离
			var tagH = $(".tag").offset().top;
			var noscroll = false;
			$(".tag").on("click", "li", function(e) {
				var btn = $(e.currentTarget);
				var value = btn.attr("value");// .children("a")
				var vive = $("#" + value);
				var top = vive.offset().top;
				$(window).scrollTop(top - 46);
				$(".tag li").removeClass("active");
				btn.addClass("active");
				noscroll = true;
				// $(window).trigger("scroll");
			});
			$(window).scroll(
					function() {
						// 获取滚动条的滑动距离
						var scroH = $(window).scrollTop();
						// return ;
						// 滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
						if (scroH >= tagH) {
							$(".tag").css({
								"position" : "fixed",
								"top" : "0px"
							});
							$(".tagpos").show();
						} else if (scroH < tagH) {
							$(".tag").css({
								"position" : "static",
								"margin" : "0 auto"
							});
							$(".tagpos").hide();
						}
						if (noscroll) {
							noscroll = false;
							return;
						}
						var tags = [ "other", "houseLend", "houseAround",
								"houseIntroduce" ];
						for (var i = 0; i < tags.length; i++) {
							var pan = $("." + tags[i]);
							var ost = pan.offset().top;

							if (scroH + 46 >= ost) {
								$(".tag li").removeClass("active");
								$(".tag_" + tags[i]).addClass("active");
								return;
							}
						}

					});
		},
		getParams : function() {
			var params = {};
			params.guId = guId;
			var btn1 = $(".statusDiv a.active");
			var type = btn1.attr("type");
			params.type = type;
			var btn2 = $(".sortDiv a.active");
			var orderBy = btn2.attr("orderby");
			var direction = btn2.attr("direction");
			params.orderBy = orderBy;
			params.direction = direction;
			for ( var ele in params) {
				if (params[ele] == undefined || params[ele] == "undefined") {
					delete params[ele];
				}
			}
			return params;
		},
		sortBind : function() {
			var params = {};
			params.guId = guId;
			$(".sortDiv").on(
					"click",
					"a",
					function(e) {
						$(".sortDiv a").removeClass("active");
						var btn = $(e.currentTarget);
						btn.addClass("active");
						var id = btn.attr("id")
						if (id != "default") {
							var direction = btn.attr("direction");
							if (direction == null || direction == "") {
								direction = "DESC";
							}
							if (direction == "ASC") {
								direction = "DESC"
							} else {
								direction = "ASC"
							}
							btn.removeClass("ASC").removeClass("DESC")
									.addClass(direction).attr("direction",
											direction);							
						}
						var params = detail.getParams();
						page = 1;
						params.page = page;
						detail.referenceFun(params);
					});
		},
		referenceFun : function(params) {
			$.reference({
				serverName : "/resources/getData.do",
				params : params,
				callback : function(data) {
					var html = detail.dataFun(data);
					if (params.page == 1) {
						$('.houseLend_detail').html("");
					}
					if (params.page * 6 >= data.total) {
						$(".houseLend_detail_more").hide();
					} else {
						$(".houseLend_detail_more").show();
					}
					$('.houseLend_detail').append(html);
				}
			});
		},
		dataFun : function(data) {
			var html = "";
			for (var i = 0; i < data.rows.length; i++) {
				var row = data.rows[i];
				if (row.type == '0') {
					html += '	<div class="fl houseLend_detail_l">';
					html += '			<div class="h_header">';
					html += '				<div class=" fl h_header_l">自用</div>';
					html += '				<div class=" fr h_header_r">';
					html += '					<font color="red">' + row.area
							+ '</font>m&sup2;';
					html += '				</div>';
					html += '			</div>';
					html += '		<div class="h_desc"><span>本房源为主管单位自用房，暂不出租</span></div>';
					html += '	</div>';
				} else {
					var classname = '';
					if (row.type != '0' && row.status == '将到期') {
						classname = 'houseLend_detail_m';
					}
					if (row.type != '0' && row.status == '已出租') {
						classname = 'houseLend_detail_r';
					} 
					if (row.type == '4') {
						classname = 'houseLend_detail_o';
					}

					html += '<div class=" fl ' + classname + '">';
					html += '				<div class="h_header">';
					html += '					<div class=" fl h_header_l">' + row.status
							+ '</div>';
					html += '					<div class=" fl h_header_r">';
					html += '						<span><font color="red">' + row.area
							+ '</font>m&sup2;</span>';
					row.price=row.price+"";
					if (row.price !== null && row.price != "") {
						html += '						<font color="red">' + toFixed(row.price)
								+ '</font>元/m²·天';

					}
					html += '					</div>';
					html += '				</div>';
					var line = 2;
					if (row.paymentMethod == null && row.mPrice == null
							&& row.otherInfo == null) {
						line--;
					}
					if (row.startTime == null && row.endTime == null) {
						line--;
					}
					html += '				<div class="h_desc line_' + line + '">';
					if (row.paymentMethod != null || row.mPrice != null
							|| row.otherInfo != null) {
						html += '<p><span>出租信息</span>';
						if (row.paymentMethod != null) {
							html += '<span>' + row.paymentMethod + '</span>';
							if (row.mPrice != null || row.otherInfo != null) {
								html += '<span>|</span>';
							}
						}
						if (row.mPrice != null) {
							html += '<span>' + toFixed(row.mPrice)
									+ '元/月</span>';
							if (row.otherInfo != null) {
								html += '<span>|</span>';
							}
						}
						if (row.otherInfo != null) {
							html += '<span>' + row.otherInfo + '</span>';
						}
						html += '</p>';
					}
					if (row.startTime != null || row.endTime != null) {
						html += '<p><span>出租时间</span>';
						if (row.startTime != null && row.endTime == null) {
							html += '<span>从' + row.startTime + '起</span>';
						}
						if (row.startTime == null && row.endTime != null) {
							html += '<span>到' + row.endTime + '截止</span>';
						}
						if (row.startTime != null && row.endTime != null) {
							html += '<span>' + row.startTime + '~'
									+ row.endTime + '</span>';
						}
						html += '</p>';
					}
					if (line < 2) {
						html += '<p><span>本房源其他出租信息正在努力整理中</span></p>';
					}
					html += '</div></div>';
				}
			}
			return html;

		},
		//isleft : true,
		othersrc : function(type) {
			var leftx=$(".other_detailInfo").css("left");
			if(leftx=="auto"){
				leftx=0;
			}
			leftx=parseInt(leftx);
			
			if(type=="left"){
				if(leftx==0){
					$(".other_detailInfo").animate({
						left : '-1920px',
					});
				}else if(leftx==-960){
					$(".other_detailInfo").animate({
						left : '0px',
					});
				} else if(leftx==-1920){
					$(".other_detailInfo").animate({
						left : '-960px',
					});
				} 
			}else{//向右
				if(leftx==0){
					$(".other_detailInfo").animate({
						left : '-960px',
					});
				}else if(leftx==-960){
					$(".other_detailInfo").animate({
						left : '-1920px',
					});
				} else if(leftx==-1920){
					$(".other_detailInfo").animate({
						left : '0px',
					});
				} 
			}
//			if (detail.isleft) {//
//				
//				$(".other_detailInfo").animate({
//					left : '-960px',
//				});
//				detail.isleft = false;
//			} else {
//				$(".other_detailInfo").animate({
//					left : '0px',
//				});
//				detail.isleft = true;
//			}
		},
		getRelated : function() {
			var params = this.getParams();
			
					$.reference({
						serverName : "/Build/related.do",
						params : params,
						callback : function(data) {
							// console.log(data)
							var html1 = '';
							for (var i = 0; i < data.length; i++) {
								if (data[i].pictures == null
										|| data[i].pictures.length == 0) {
									data[i].pictures = [ {
										uri : "/pc/core/assets/nopic_b.png"
									} ];
								}else
								{
									data[i].pictures[0].uri+='_thum.jpg';
								}
								html1 += '<a target="_blank" href="/sunproperty-war/portals/detail.do?guId='
										+ data[i].id
										+ '" class="fl other_detailInfo_content">'
										+ '<div class="other_detailInfo_housePic" style="background-image:url(/sunproperty-war'
										+ data[i].pictures[0].uri
										+ ')"></div>'
										+ '<div class="other_detailInfo_housePrice">'
										+ '<p class="otname">'
										+ data[i].name
										+ '</p>'
										
										if(data[i].price==""||data[i].price==null)
										{
											html1 += '<p class="otprice">暂无出租信息</p>' 
										}else
										{
											 html1 += '<p class="otprice"> '
												+ toFixed(data[i].price)
												+ '元/m&sup2;·天</p>' 
										}
								 
										html1 += '</div>' + '</a>'
							}
							$('.other_detailInfo').html(html1);
							detail.pie($('.other_detailInfo .other_detailInfo_housePic'));
						}
					});

		}
	}
	$(document).ready(function(e) {
		detail.init();
	});
})