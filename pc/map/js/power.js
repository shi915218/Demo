function Power(){
	  // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
	  this.defaultOffset = new BMap.Size(380, 0);
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
Power.prototype = new BMap.Control();

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
Power.prototype.initialize = function(map){
	  // 创建一个DOM元素
	 var  html = '<div class="powerDiv">';
	 html += '<div style="font-size:11px;width:300px;margin:0 auto; padding:0px 0;">';
	 html += '<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502004120" style="display:inline-block;text-decoration:none;"><img src="/sunproperty-war/pc/core/assets/powerLogo.jpg" style="float:left;width:14px"/><p style="float:left;margin: 0px 0px 0px 5px; color:#000000;">浙公网安备 33010502004120号</p></a>';
	 html += '</div>';
	 html += '</div>';
	 var div = this._div = parseDom(html);
	 map.getContainer().appendChild(div);
	  // 将DOM元素返回
	  return div;
	}