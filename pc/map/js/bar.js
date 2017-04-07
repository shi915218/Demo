// JavaScript Document
var bar={
	init:function()
	{
		this.bind();
	},
	bind:function()
	{
		var that=this;
		$(".barpan").on("click",".select li",function(e)
		{
			var li=$(e.currentTarget);
			if(li.hasClass("menuli")||li.hasClass("custom"))
			{
				return false;
			}else
			{
				var select=li.parents(".select");
				select.find("li").removeClass("active");
				li.addClass("active");
				var span=select.children("span");
				var text=li.text();
				if(li.hasClass("all"))
				{
					var keyvalue=li.attr("keyvalue");
					if(keyvalue!=null&&keyvalue!="")
					{
						text=keyvalue;
					}
				}
				span.text(text);
				var allnames=span.attr("names").split(",");
				for(var i=0;i<allnames.length;i++)
				{
					span.attr(allnames[i],"");
				}
				var names;
				if(li.parents("menuli").length!=0)
				{
					names=li.parents("menuli").attr("names").split(",");
				}else
				{
					names=allnames;
				}
				for(var i=0;i<names.length;i++)
				{
					span.attr(names[i],li.attr(names[i]));
				}
				that.getData();
			}
		});
		$(".barpan").on("click",".select li a.btn",function(e)
		{
			var li=$(e.currentTarget).parents(".custom");
			var select=li.parents(".select");
			select.find(li).removeClass("active");
			var span=select.children("span");
				var allnames=span.attr("names").split(",");
				var inputs=li.find("input");
				
				var names;
				if(li.parents(".menuli").length!=0)
				{
					names=li.parents(".menuli").attr("names").split(",");
				}else
				{
					names=allnames;
				}
				var text="";
				var v1;
				var v2;
				var unit=select.attr("unit");
				for(var i=0;i<names.length;i++)
				{
					var value=li.find("input[name="+names[i]+"]").val();
					if(value!=""&&isNaN(parseFloat(value)))
					{
						alert("请填写数值");	
						return ;
					}
					if(i==0)
					{
						v1=value;
					}
					if(i==1)
					{
						v2=value;
					}
				}
				if(v1==""&&v2=="")
				{
					return ;
				}
				if(v1!=""&&v2!="")
				{
					if(parseFloat(v1)>parseFloat(v2))
					{
						alert("数值区间错误");
						return ;
					}
					text=v1+"-"+v2+unit;
				}
				if(v2=="")
				{
					text=v1+unit+"以上";
				}
				if(v1=="")
				{
					text=v2+unit+"以下";
				}
				for(var i=0;i<allnames.length;i++)
				{
					span.attr(allnames[i],"");
				}
				for(var i=0;i<names.length;i++)
				{
					var value=li.find("input[name="+names[i]+"]").val();
					span.attr(names[i],value);
				}
				span.text(text);
				that.getData();
		});
	},
	getParams:function()
	{
		var selects=$(".barpan .select");
		var params={};
		
		for(var i=0;i<selects.length;i++)
		{
			var select=$(selects[i]);
			
			var span=select.children("span");
			var names=span.attr("names").split(",");
			for(var j=0;j<names.length;j++)
			{
				params[names[j]]=span.attr(names[j]);
			}
		}
		for(var ele in params)
		{
			if(params[ele]=="")
			{
				delete  params[ele];
			}
		}
		return params;
	},
	getData:function()
	{
		var params=this.getParams();
		list.getData(params);
	}
}