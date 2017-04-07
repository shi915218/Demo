// JavaScript Document
var mappan={
	init:function()
	{
		map.init();
		map.addPage(page);
		bar.init();
		list.init();
		header.init();
	}
}
$(document).ready(function(e) {
    mappan.init();
});