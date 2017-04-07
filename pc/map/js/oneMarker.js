/**
 * 缩放小于等于12时只显示一个点在拱墅区
 */
function OneMarker(){
	
}
OneMarker.prototype= new BMap.Overlay();
OneMarker.prototype.init=function(){
	//var point = new BMap.Point(120.159758,30.348074); //120.146745,30.326455
	this._point=new BMap.Point(120.146745,30.326455);
	return this._point;
}
OneMarker.prototype.initialize=function(map){
	this._map=map;
	var that=this;
	var div = this._div=document.createElement("div");
	div.style.position="absolute";
	div.style.zIndex=BMap.Overlay.getZIndex(this._point.lat);
	div.className="oneMarker hidden";
	var that = this;
	/*this._map.removeEventListener("zoomend", that.zoomChange);  */
	this._map.addEventListener("zoomend",function(){
		that.zoomChange(that._map.getZoom());
	});
	div.onmouseover=function(){
		
	}
	div.onmouseout=function(){
		
	}
	div.onclick=function(){
		//map.addMarkers(map._data);
		var point = new BMap.Point(120.159758,30.348074);  // 创建点坐标  
		that._map.centerAndZoom(point, 13);   
	}
	map.getPanes().labelPane.appendChild(div);
	return div;
}
OneMarker.prototype.zoomChange = function(zoom){
	var div = $(this._div);
	if(zoom<=12){
		div.removeClass('hidden');
	}else{
		div.addClass('hidden');
	}
}
OneMarker.prototype.draw = function(){
    /*var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top  = pixel.y - 30 + "px";*/
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - 13 + "px";
	this._div.style.top = pixel.y - 26 + "px";
  }