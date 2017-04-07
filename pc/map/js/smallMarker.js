// JavaScript Document
function parseDom(arg) {
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes[0];
};
function SmallMarker() {
}
SmallMarker.prototype = new BMap.Overlay();
SmallMarker.prototype.init=function(data)
{
	this._point = new BMap.Point(data.longitude,data.latitude);
	this._data = data;
	return this._point;
}
SmallMarker.prototype.initialize = function(map) {
	this._map = map;
	var data=this._data;
	var classname="";
	if(data.rentRate>0.8)
	{
		classname="srm";
	}
	if(data.rentRate<=0.8&&data.rentRate>0.6)
	{
		classname="sbm";
	}
	if(data.rentRate<=0.6)
	{
		classname="sgm";
	}
	var html = '';
	html += '<div class="smallMarker '+classname+'"></div>';
	var div = this._div = parseDom(html);
	div.style.position = "absolute";
	this._zIndex=div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	var that = this;
	
	div.onmouseover = function() {
		div.style.zIndex = 99999;
	}
	div.onmouseout = function() {
		div.style.zIndex=that._zIndex;
	}
	map.getPanes().labelPane.appendChild(div);
	return div;
}
SmallMarker.prototype.draw = function() {
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
	this._div.style.left = pixel.x - 13 + "px";
	this._div.style.top = pixel.y - 26 + "px";
}