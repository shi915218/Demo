// JavaScript Document
function parseDom(arg) {
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes[0];
};
function BigMarker() {
}
BigMarker.prototype = new BMap.Overlay();
BigMarker.prototype.init = function(data) {
	this._point = new BMap.Point(data.longitude, data.latitude);
	this._data = data;
	return this._point;
}
BigMarker.prototype.bind=function()
{
	var div=this._div;
	var data=this._data;
	$(div).on("click", '.hoverd', function() {
				var html = "";
				if (data.pictures != null && data.pictures.length > 0) {
					var innerhtml = "";
					var picwraphtml = "";
					for (var i = 0; i < data.pictures.length; i++) {
						var pic = data.pictures[i];
						var cls = "";
						if (i == 0) {
							cls = " active";
						}
						innerhtml += "<div class='item " + cls + "'>"
								+ "	<img src='/sunproperty-war" + pic.uri
								+ "' alt=''>" + "</div>" + "";
						picwraphtml += "<li data-target='#sun-pics-carousel"
								+ data.id + "' data-slide-to='" + i
								+ "' class='" + cls + "'>"
								+ "	<img  src='/sunproperty-war" + pic.uri+"_thum.jpg"
								+ "' alt=''>" + "</li>";
					}
					html = "<div id='sun-pics-carousel"
							+ data.id
							+ "' class='carousel  slide canremove ' data-ride='carousel'>"
							+ "	<div class='carousel-main'>"
							+ "		<div class='carousel-inner' >"
							+ innerhtml
							+ "		</div>"
							+ "		<a class='left carousel-control' href='#sun-pics-carousel"
							+ data.id
							+ "' >"
							+ "			<span class='glyphicon glyphicon-chevron-left' data-target='#sun-pics-carousel"
							+ data.id
							+ "' data-slide='prev'></span>"
							+ "		</a>"
							+ "		<a class='right carousel-control' href='#sun-pics-carousel"
							+ data.id
							+ "' > "
							+ "			<span class='glyphicon glyphicon-chevron-right'  data-target='#sun-pics-carousel"
							+ data.id
							+ "' data-slide='next'></span>"
							+ "		</a>"
							+ "	</div>"
							+ "	<ol class='smallpics-wrap'>"
							+ picwraphtml
							+ "	</ol>"
							+ "	<a class='carousel-close' ><img src='/sunproperty-war/pc/picture/wid-close.png'></a>"
							+ "</div>";
				} else {
					
				}

				$("body").append(html);
				$("#sun-pics-carousel" + data.id).carousel();
				var $carousel=$("#sun-pics-carousel"+ data.id).data("sun.carousel");
				$carousel.resize();
				return false;

			})
}
BigMarker.prototype.sinitialize=function()
{
	this.status="small";
	var data=this._data;
	var classname="";
	if(data.rstu==3)
	{
		classname="rm";
	}
	if(data.rstu==2)
	{
		classname="bm";
	}
	if(data.rstu==1)
	{
		classname="gm";
	}
	var html = '';
	html += '<div val="'+data.id+'" class="smallMarker '+classname+'"></div>';
	var div = this._div = parseDom(html);
	return div;
}
BigMarker.prototype.binitialize=function()
{
	this.status="big";
	var data = this._data;
	var classname = "";
	if(data.rstu==3)
	{
		classname="rm";
	}
	if(data.rstu==2)
	{
		classname="bm";
	}
	if(data.rstu==1)
	{
		classname="gm";
	}
	var html = '';
	if(data.name==null||data.name=="")
	{
		data.name="无名称"
	}
	html += '<div val="'+data.id+'" class="bigMark '  + classname + '"><div class="bml">'
			+ data.price.toFixed(2) + '元</div><div class="bmr">' + data.name
			+ '</div></div>';
	var div = this._div = parseDom(html);
	return div;
}
BigMarker.prototype.zoomChange = function(zoom)
{
	var div = $(this._div); 
	var data=this._data;
	//var $oneMark=$("#mapdiv .oneMarker");
	if(zoom<=12){
		//this.status="one";             // 初始化地图，设置中心点坐标和地图级别		
		div.addClass('hidden');
		
	}else if(zoom<15&&this.status!="small")
	{
		this.status="small";
		div.removeClass("hidden");
		div.removeClass("bigMark");
		div.addClass("smallMarker");
		div.html("");
		this._hover = false;	
		
	}else if(zoom>=15&&this.status!="big")
	{
		this._hover = false;
		this.status="big";
		div.removeClass("hidden");
		div.removeClass("smallMarker");
		div.addClass("bigMark");
		var html="";
		html += '<div class="bml">'
		+ data.price.toFixed(2) + '元</div><div class="bmr">' + data.name
		+ '</div>';
		div.html(html);
	
	}
}

BigMarker.prototype.hoverBind = function()
{
	var div = this._div; 
	var data = this._data;
	var that = this;
	div.onmouseover = function() {

		div.style.zIndex = 99999;
		var nopic=false;
		var reviewpic=null;
		if(data.pictures==null||data.pictures.length==0)
		{
			nopic=true;
			reviewpic={uri:"/pc/core/assets/nopic.png"};
		}else
		{
			reviewpic={
					uri:data.pictures[0].uri+'_thum.jpg'
			};
		}
		if (!that._hover) {
			that._hover = true;
			var html = '<div style="display:black" class="bigMarkHover"><a target="_blank" href="/sunproperty-war/portals/detail.do?guId='
					+ data.id
					+ '" class="hoverImg" style="background-image:url(/sunproperty-war'
					+ reviewpic.uri
					+ ')"><div class="hoverarea">'
					+ data.area
					+ '㎡<div class="hoverd"></div></div></a><div class="hoveraddress">'
					+ data.address + '</div></div>';

			$(that._div).append(html);
			try{
				$(that._div).find(".hoverImg").backgroundcover({safearea: "50%,50%,50%,50%"});
			}catch(e){}
		}
	}
}
BigMarker.prototype.initialize = function(map) {
	this._map = map;
	var div=null;
	var zoom=this._map.getZoom();
	if(zoom<15)
	{
		div=this.sinitialize();
	}else
	{
		div=this.binitialize();
	}
	var data = this._data;
	div.style.position = "absolute";
	this._zIndex = div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	var that = this;
	
	this._map.addEventListener("zoomend",function(){
			that.zoomChange(that._map.getZoom());
		});
	div.onmouseout = function() {
		div.style.zIndex = that._zIndex;
	}
	$(div).hover(function(){
		$(".bigMark,.smallMarker").removeClass("hover");
	});
	
	this.hoverBind();
	this.bind();
	map.getPanes().labelPane.appendChild(div);
	return div;
}
BigMarker.prototype.draw = function() {
	var map = this._map;
	var zoom=this._map.getZoom();
	var x=32;
	var y= 67;
	if(zoom<15)
	{
		x=13;
		y= 26;
	}
	var pixel = map.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - x + "px";
	this._div.style.top = pixel.y - y + "px";
}