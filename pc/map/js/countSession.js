// JavaScript Document

function CountSession(){
	  // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
	  this.defaultOffset = new BMap.Size(0, 0);
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
CountSession.prototype = new BMap.Control();

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
CountSession.prototype.initialize = function(map){
	  // 创建一个DOM元素
	 var  html = '<div class="countSession"><span>访问次数:</span><span class="count">'+countSession+'</span></div>';     	
	  var div = this._div = parseDom(html);	
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(div);
	  // 将DOM元素返回
	  return div;
	}