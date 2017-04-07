// JavaScript Document

function Legend(){
	  // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
	  this.defaultOffset = new BMap.Size(40, 20);
	  this.rentType = "";
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
Legend.prototype = new BMap.Control();
Legend.prototype.getRentType=function(){
	return   this.rentType;
}

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
Legend.prototype.initialize = function(map){
	  // 创建一个DOM元素
	 var  html = '<div class="legend"><div class="r0">出租状态</div><div class="r1"><div class="rl"></div><div class="rm">将到期</div><div class="rmm"></div><div class="rr"></div></div><div class="r2"><div class="rl"></div><div class="rm">招租中</div><div class="rmm"></div><div class="rr"></div></div><div class="r3"><div class="rl"></div><div class="rm">已出租</div><div class="rmm"></div><div class="rr"></div></div></div>';
	 var div = this._div = parseDom(html);
	 this.animation();
	 this.triger();
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(div);
	  // 将DOM元素返回
	  return div;
	}
Legend.prototype.animation = function()
{
	 var div = this._div;
	 var that=this;
	 $(div).mouseenter(function()
	 {
		  $(".legend .r1").animate({width:"102px",left:"56px"});
		  $(".legend .r2").animate({width:"102px",left:"140px"});
		  $(".legend .r3").animate({width:"102px",left:"220px"});
	      $(".legend .r1 .rm").animate({width:"70px"});
	      $(".legend .r2 .rm").animate({width:"70px"});
		  $(".legend .r3 .rm").animate({width:"70px"});

	 });
	 $(div).mouseleave(function() {
		$(".legend .r1").animate({width:"32px",left:"40px"});
		$(".legend .r2").animate({width:"32px",left:"56px"});
		$(".legend .r3").animate({width:"32px",left:"70px"});
	    $(".legend .r1 .rm").animate({width:"0px"});
	    $(".legend .r2 .rm").animate({width:"0px"});
		$(".legend .r3 .rm").animate({width:"0px"});
	});
}
Legend.prototype.triger = function()
{
	 var div = this._div;
	 var that=this;
	 $(div).on("click",".r0,.r1,.r2,.r3",function(e)
	{
		var btn=$(e.currentTarget);
		var rentType=""
		if(btn.hasClass("r1"))
		{//将到期
			//rentType="3";
			rentType="2";
		}
		if(btn.hasClass("r2"))
		{//招租中
			//rentType="2";
			rentType="3";
		}
		if(btn.hasClass("r3"))
		{//已出租
			rentType="1";
		}
		if(btn.hasClass("r0"))
		{
			rentType="";
		}
		that.rentType=rentType;
		list.rentType(rentType);
	});
	
}