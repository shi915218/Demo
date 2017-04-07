// JavaScript Document

function Jump(){
	  // 默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	  this.defaultOffset = new BMap.Size(20, 20);
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
Jump.prototype = new BMap.Control();

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
Jump.prototype.initialize = function(map){
	  // 创建一个DOM元素
	 var  html = '<div class="jump"><span class="ico"></span><span>列表查看</span></div>';     	
	  var div = this._div = parseDom(html);
	  div.onclick =function()
	  {
		  var href=window.location.href;
		 var hash= window.location.hash
		  var search = window.location.search;
		  if(hash.indexOf("/?"))
		  {
			  hash=hash.substring(3,hash.length);
			}
			if(search!="")
			{
				search+="&";
			}
			search+=hash;
		  if(search=="")
		  {
			 search= "?vive=list"; 
		}else
		{
			 if(search.indexOf("vive=map") > 0)
			 {
				  search=search.replace("vive=map","vive=list");
			}else
			{
				search=search+"&"+"vive=list";
			}
		}
		  window.location.search=search;
		  
	  }
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(div);
	  // 将DOM元素返回
	  return div;
	}