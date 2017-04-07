// JavaScript Document
var list = {
	page:1,
	size:50,
	total:101,
	init:function()
	{
		this.bind();
		list.pie($(".list ul .buildimg"))
	},
	pie:function(objs)
	{
		try{
			objs.backgroundcover({safearea: "50%,50%,50%,50%"});
		}catch(e){}
	},
	bind:function()
	{
		var that=this;
		$(".sort").on("click",".panbtn",function(e)
		{
			$(".sort .panbtn").removeClass("active");
			var panbtn=$(e.currentTarget);
			panbtn.addClass("active")
			var orderBy=panbtn.attr("orderBy");
			if(!orderBy=="")
			{
				var direction=panbtn.attr("direction");
				panbtn.removeClass("ASC");
				panbtn.removeClass("DESC");
				if(direction=="DESC")
				{
					panbtn.attr("direction","ASC");
					panbtn.addClass("ASC");
				}else
				{
					panbtn.attr("direction","DESC");
					panbtn.addClass("DESC");
				}
			}
			that.getData();
		});
		var stop=false;
		$(".list").scroll( function(e) {
			var t1=$(this).scrollTop();
			var t2=$(this).height();
			var t3=$(".list>ul").height();
			if (t1+t2+100>t3&&!stop) {    
				stop=true;
				that.getNextPage();
			}
			if(t1+t2+100<t3)
			{
				stop=false;
			}  
		}); 
		$(".list ul").on("click",".buildaddress>span",function(e)
		{
			var span=$(e.currentTarget);
			var li=span.parents("li");
			var id=li.attr("value");
			map.gotoPoint(id);
		});
		$(".listpan").on("click",".tigger",function(e)
		{
			var span=$(e.currentTarget);
			if(span.hasClass("ann"))
			{
				return false;
			}
			span.addClass("ann");
			if(span.hasClass("hide"))
			{
				list.show();
			}else
			{
				list.hide();
			}
		});
	},
	show:function()
	{
		$(".listpan").animate({right:"0px"},function(){
			$(".tigger").removeClass("hide");
			$(".tigger").removeClass("ann");
			});
		$("#mapdiv").animate({right:"340px"});
		$(".mappan").animate({"margin-right":"340px"});
	},
	hide:function()
	{
		$(".listpan").animate({right:"-339px"},function(){
			$(".tigger").addClass("hide");
			$(".tigger").removeClass("ann");
			});
		$("#mapdiv").animate({right:"0px"});
		$(".mappan").animate({"margin-right":"0px"});
		
	},
	getParams:function(params)
	{
		if(params==null)
		{
			params=bar.getParams();
		}
		if(!("keyword" in params))
		{
			var keyword=header.getKeyWord().replace(/^\s+|\s+$/g,"");
			if(keyword !="")
			{
				params.keyword=keyword;
			}
		}
		if(!("rentType" in params))
		{
			var rentType=map.getRentType();
			if(rentType !="")
			{
				params.rentType=rentType;
			}
		}
		var acbtn=$(".listpan .sort .panbtn.active");
		var orderBy=acbtn.attr("orderBy");
		if(!orderBy=="")
		{
			params.orderBy=orderBy;
			params.direction=acbtn.attr("direction");;
		}
		return params;
	},
	search:function(value)
	{
		var params=bar.getParams();
		this.page=1;
		params.keyword=value;
		this.getData(params);
	},
	rentType:function(rentType)
	{
		var params=bar.getParams();
		params.rentType=rentType;
		this.getData(params);
	},
	getData:function(params)
	{	
		if(params==null)
		{
			params=bar.getParams();
		}
		this.page=1;
		params=this.getParams(params);
		var bd=false;
		for(var ele in params)
		{
			if(ele!="page"&&ele!="size"&&ele!="orderBy"&&ele!="direction")
			{
				bd=true;
				break;
			}
		}
		for(var ele in params)
		{
			if(params[ele]==null||params[ele]+""=="")
			{
				delete params[ele];
			}
		}
		this.changeUrl(params);
		this.getDataImpl(params,true,bd);
	},
	changeUrl:function(params)
	{
		url="?";
		for(var ele in params)
		{
			url+=ele+"="+params[ele]+"&";
		}
		if(url.indexOf("&")>-1)
		{
			url=url.substring(0,url.length-1);
		}
		url = encodeURI(url);
		if(history !=undefined&&history.pushState!=undefined)
		{
			 history.pushState(null, null, url);
		}else
		{
			url='/sunproperty-war/portals/index.do'+url;
			window.location.href=url; 
		}
		
	},
	getNextPage:function()
	{
		if((this.page)*this.size>this.total)
		{
			return ;
		}
		this.page+=1;
		var params=this.params;
		params=this.getParams(params);
		this.getDataImpl(params)
	},
	getDataImpl:function(params,needclear,bd)
	{
		this.params=params; 
		params.page=this.page;
		params.size=this.size;
		var that=this;
		$.reference({
				serverName:"/Build/getMapData.do",
				params:params,
				callback:function(data)
				{
					that.total=data.total;
					if(needclear)
					{
						map.clear();
						list.clear();
					}
					if(bd)
					{
						map.setZoom();
					}
					that.creatList(data);
					map.addPage(data.rows);
					if(bd)
					{
						map.toAllVive();
					}
				}
		});
	},
	clear:function()
	{
		$(".list ul").html("");
		$(".list ul").scrollTop();
	},
	creatList:function(data)
	{
		var rows=data.rows;
		var html='';
		for(var i=0;i<rows.length;i++)
		{
			var b=rows[i];
			if(b.name==null||b.name=="")
			{
				b.name="无名称"
			}
			html+='<li value="'+b.id+'">';
			html+='<a target="_blank" href="/sunproperty-war/portals/detail.do?guId='+b.id+'">';
			if(b.pictures==null||b.pictures.length==0)
			{
				html+='		<div class="buildimg" style="background-image:url(/sunproperty-war/pc/core/assets/nopic.png)"></div>';
			}else{
				html+='		<div class="buildimg" style="background-image:url(/sunproperty-war'+b.pictures[0].uri+'_thum.jpg)"></div>';
			}
			html+='	</a>';
			html+='		<div class="buildinfo">';
			html+='			<p class="buildname"><a target="_blank" href="/sunproperty-war/portals/detail.do?guId='+b.id+'">'+b.name+'</a></p>';
			html+='			<p>';
			if(b.price==""||b.price==null)
			{
				html+='				<span class="buildprice">暂无</span>';
				html+='				<span class="buildarea"></span>';
			}
			else
			{
				html+='				<span class="buildprice">'+b.price.toFixed(2)+'元/㎡·天</span>';
				html+='				<span class="buildarea">'+b.area+'㎡</span>';
			}
			
			html+='			</p>';
			html+='			<div class="buildaddress"><span></span><div class="addr">地址：'+b.address+'</div></div>';
			html+='		</div>';
			html+='		</li>';
		}
		$(".sum em").html(data.total);
		$(".list ul").append(html);
		list.pie($(".list ul .buildimg"))
		
	}
}
var trim =function(str){
	
	return str.replace(/^\s+|\s+$/g,"");
}