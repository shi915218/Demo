// JavaScript Document
$(document).ready(function(e) {
    scroll.init();
});
var scroll=
{
	init:function()
	{
		this.initbtn();
		this.bind();
		this.hide();
	},
	initbtn:function()
	{
		$("body").append('<a class="gototop"></a>');
	},
	bind:function()
	{
		$(window).scroll(function() {
			// 获取滚动条的滑动距离
			var scroH = $(this).scrollTop();
			var he=$(window).height();
			if(scroH>he)
			{
				scroll.show();
			}else
			{
				scroll.hide();
			}
		});
		$("body .gototop").click(function(){
			$('html,body').animate({scrollTop: 0}, 500);
		});
		
	},
	show:function()
	{
		$("body .gototop").css("display","block");
	},
	hide:function()
	{
		$("body .gototop").css("display","none");
	}
}