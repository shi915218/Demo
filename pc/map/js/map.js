var map={
	_marker:'small',
	_zoom:13,
	pointArr:[],
	init:function()
	{
		var map =this._map = new BMap.Map("mapdiv",{enableMapClick:false});          // 创建地图实例  
		var point = new BMap.Point(120.159758,30.348074);  // 创建点坐标  
		map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别
		map.enableScrollWheelZoom(true);
		var legend = new Legend();
		this._legend=legend;
		// 添加到地图当中
		map.addControl(legend);
		var jump = new Jump();
		
		map.addControl(jump);
		//添加到地图当中
		var power = new Power();
		map.addControl(power);
		var cs = new CountSession();
		map.addControl(cs);
	},
	gotoPoint:function(id)
	{
		$(".bigMark[val="+id+"],.smallMarker[val="+id+"]").addClass("hover");
		var datas=this._data;
		var _map = this._map;
		for(var i=0;i<datas.length;i++)
		{
			if(datas[i].id==id)
			{
				var point = new BMap.Point(datas[i].longitude,datas[i].latitude);
				_map.setZoom(17);
				_map.panTo(point); 
				break;
			}
		}
	},
	getRentType:function()
	{
		return this._legend.getRentType();
	},
	setZoom:function(zoom)
	{
		if(zoom==null)
		{
			zoom=15
		}
		var _map = this._map;
		_map.setZoom(zoom);   
	},
	clearMarkers:function()
	{
		this.pointArr=[];
		this._map.clearOverlays();
	},
	clear:function()
	{
		this._data=[];
		this.clearMarkers();
	},
	addPage:function(data)
	{
		if(this._data==null)
		{
			this._data=[];
		}
		this._data = this._data.concat(data);  
		this.addMarkers(data);
		this.addOneMarker();
	},
	addMarkers:function(data)
	{
		if(data==null)
		{
			data=this._data;
		}
		for(var i=0;i<data.length;i++)
		{
			var cdata=data[i];
			this.addMarker(cdata);
		}
	},
	addMarker:function(cdata)
	{
		//if(this._marker=="big")
		//{
			this.addBigMarker(cdata);
		//}else
		//{
		//	this.addSmallMarker(cdata);
		//}
	},
	toAllVive:function()
	{
		var pointArr = this.pointArr;
		this._map.setViewport(pointArr);
	},
	/*
	addSmallMarker:function(data)
	{ 
		var map =this._map;
    	var smallMarker = new SmallMarker();
		var p=smallMarker.init(data);
		this.pointArr.push(p);
   	 	map.addOverlay(smallMarker);
	},*/
	addBigMarker:function(data)
	{
		var map =this._map;
    	var bigMarker = new BigMarker();
		var p=bigMarker.init(data);
		this.pointArr.push(p);
   	 	map.addOverlay(bigMarker);
	},
	addOneMarker:function(){
		var map=this._map;
		var oneMarker = new OneMarker();
		var p = oneMarker.init();
		map.addOverlay(oneMarker);
	}
}