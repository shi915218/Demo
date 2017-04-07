// JavaScript Document
var header={
	init:function()
	{
		this.bind();
		$(function(){ $('input, textarea').placeholder(); });
	},
	bind:function()
	{
		var that=this;
		$(".searchdiv a").click(function(e)
		{
			var value=$(".searchdiv input").val().replace(/^\s+|\s+$/g,"");
			that.search(value);
		});
		$(".searchdiv input").keydown(function(e)
		{
			if (event.keyCode == 13)
        	{
				var value=$(".searchdiv input").val();
				if(value=="")
				{
					return ;
				}
				that.search(value);
        	}
		});
	},
	getKeyWord:function()
	{
		var value=$(".searchdiv input").val();
		return value;
	},
	search:function(value)
	{
		var url='/sunproperty-war/portals/index.do?keyword='+value;
		window.location.href=url;
	}
};