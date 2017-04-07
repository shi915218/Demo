/**
 * 列表页面
 */
		
$(document).ready(function(){
	try{
		$(".picitem").backgroundcover({safearea: "50%,50%,50%,50%"});
	}catch(e){}

$(function(){ $('input, textarea').placeholder(); });	
	var trim =function(str){
		
		return str.replace(/^\s+|\s+$/g,"");
	}
	//每次进来刷新获取数据
	var hosList={
			pagenum:1,
			pagesize:50,
			inited:false,
			total:0,			
			init:function(){
				var total=$(".housetips .em-font").text();
				hosList.total=Number(total);				
				hosList.show();
				hosList.bind();
			},
			show:function(){
				var param=hosList.getRequest();			
				
				if(param.page){
					hosList.pagenum =Number(param.page );
				}
				if(param.size){
					hosList.pagesize =Number(param.size );
				}
				$(".sortselect.select li").removeClass("active");
				if(param.orderBy!=null&&param.direction!=null&&param.direction!=""){					
						var seleli=$(".sortselect.select li[direction='"+param.direction.toLowerCase()+"'][orderby='"+param.orderBy+"']");
						$(".sortselect.select span").html(seleli.text());
						seleli.addClass('active');
				}else {					
					var seleli=$(".sortselect.select li[direction='default']");
					$(".sortselect.select span").html(seleli.text());
					seleli.addClass('active');
				}
	
				$(".unitselect.select li").removeClass("active");
				if(param.unitCode!=null&&param.unitCode!=""){					
						var seleli=$(".unitselect.select li[unitcode='"+param.unitCode.toLowerCase()+"']");
						$(".unitselect.select span").html(seleli.text());
						seleli.addClass('active');
				}else {					
					var seleli=$(".unitselect.select li[unitcode='default']");
					//$(".unitselect.select span").html(seleli.text());
					seleli.addClass('active');
				}
				//unitCode
				
				$('.seachlistPanel div[type=sstreetlist] .searchsel').removeClass("active");
				if(param.steetCode){
					//val
					
					$('.seachlistPanel div[type=sstreetlist]  .searchsel[val='+param.steetCode+']').addClass("active");
				}else{
					$('.seachlistPanel div[type=sstreetlist]  .searchsel.selall').addClass("active");
				}
				$('.seachlistPanel div[type=shousetypes] .searchsel').removeClass("active");
				if(param.type){
					
					$('.seachlistPanel div[type=shousetypes]  .searchsel[val='+param.type+']').addClass("active");
				}else{
					$('.seachlistPanel div[type=shousetypes]  .searchsel.selall').addClass("active");
				}
				
				$('.seachlistPanel div[type=sareas]  .searchsel').removeClass("active");
				var miniArea="";
				var maxArea="";
				if(param.miniArea!=null){
					miniArea=param.miniArea;
				}
				if(param.maxArea!=null){
					maxArea=param.maxArea;
				}
				if(miniArea!=""||maxArea!="")
				{
					var ac=$('.seachlistPanel div[type=sareas]  .searchsel[miniarea='+miniArea+'][maxarea='+maxArea+']');
					if(ac.length>0)
					{
						ac.addClass("active");
					}else
					{
						$('.seachlistPanel div[type=sareas]  .sel-input.sel-areamin').val(miniArea);
						$('.seachlistPanel div[type=sareas]  .sel-input.sel-areamax').val(maxArea);
					}
				}else
				{
					$('.seachlistPanel div[type=sareas]  .selall').addClass("active");
				}
				
				$('.seachlistPanel div[type=samounts]  .searchsel').removeClass("active");
				var miniPrice="";
				var maxPrice="";
				var miniMPrice="";
				var maxMPrice="";
				if(param.miniPrice!=null){
					miniPrice=param.miniPrice;
				}
				if(param.maxPrice!=null){
					maxPrice=param.maxPrice;
				}
				if(param.miniMPrice!=null){
					miniMPrice=param.miniMPrice;
				}
				if(param.maxMPrice!=null){
					maxMPrice=param.maxMPrice;
				}
				if(miniPrice!=""||maxPrice!="")
				{
					var miniPrice1=miniPrice.replace(".","\\.");
					var maxPrice2=maxPrice.replace(".","\\.");
					var ac=$('.seachlistPanel div[type=samounts]  .searchsel[miniprice='+miniPrice1+'][maxprice='+maxPrice2+']');
					if(ac.length>0)
					{
						ac.addClass("active");
					}else
					{
						$('.seachlistPanel div[type=samounts]  .sel-input.sel-pricemin').val(miniPrice);
						$('.seachlistPanel div[type=samounts]  .sel-input.sel-pricemax').val(maxPrice);
					}
				}
				if((miniPrice==""&&maxPrice=="")&&(miniMPrice!=""||maxMPrice!=""))
				{
					var ac=$('.seachlistPanel div[type=samounts]  .searchsel[minimprice='+miniMPrice+'][maxmprice='+maxMPrice+']');
					if(ac.length>0)
					{
						ac.addClass("active");
					}else
					{
						$('.seachlistPanel div[type=samounts]  .sel-input.sel-mpricemin').val(miniMPrice);
						$('.seachlistPanel div[type=samounts]  .sel-input.sel-mpricemax').val(maxMPrice);
					}
				}
				if(miniPrice==""&&maxPrice==""&&miniMPrice==""&&maxMPrice=="")
				{
					$('.seachlistPanel div[type=samounts]  .selall').addClass("active");
				}
				hosList.getPagination();
			},
			getPagination:function(){
				var lihtml="";
				var pages=Math.ceil(hosList.total/hosList.pagesize);
				var pagenum= hosList.pagenum;
				var firstpage=1;
				var endpage=pages;
				
				if(hosList.pagenum-2>1)
				{
					firstpage=hosList.pagenum-2;
				}
				if(hosList.pagenum+2<=pages)
				{
					endpage=hosList.pagenum+2;
				}
				if(endpage-firstpage<4)
				{
					endpage=firstpage+4
					if(endpage>pages)
					{
						endpage=pages;
					}
				}
				if(endpage-firstpage<4)
				{
					firstpage=endpage-4
					if(firstpage<1)
					{
						firstpage=1;
					}
				}
				
				if(hosList.total>0){					
					for(var k=firstpage;k<=endpage;k++){
						if(k>pages){
							break;
						}
						if(hosList.pagenum==k){
							lihtml+="<li><a href='javascript:void(0);' class='pagenum active' val='"+(k)+"'>"+(k)+"</a></li>";	
							
						}else{
							lihtml+="<li><a href='javascript:void(0);'  class='pagenum ' val='"+(k)+"'>"+(k)+"</a></li>";
						}
					}
				}else{					
					$(".houselist ul").html("<li class='nodata'>没有相关数据</li>");
					return ;
				}
				var prvecls="";
				if(pagenum!="1"){
					prvecls="active";					
				}
				var nextcls="";
				if(pagenum!=pages){
					nextcls="active";					
				}
				lihtml="<li><a href='javascript:void(0);' class='turnpage prev "+prvecls+"'>上一页</a></li>"
				+lihtml+"<li><a href='javascript:void(0);'  class='turnpage next "+nextcls+"'>下一页</a></li>";
				var html="<nav>" +
						"<ul>" +
						lihtml+
						"</ul>" +
						"</nav>";
			
				$(".housePagin").html(html);
			},
			getSearchUrl:function(param){
				var pagetype=param.pagetype;
				var page = param.pagenum;
				var size=hosList.pagesize;
				var steetCode=param.steetCode;
				var type=param.type;
				var unitCode=param.unitCode
				if(type!=null&&type!=""&&type[0]!="%")
				{
					type = encodeURI(type);
				}
				var miniArea=param.miniArea;
				var maxArea=param.maxArea;
				var miniPrice=param.miniPrice;
				var maxPrice=param.maxPrice;
				var miniMPrice=param.miniMPrice;
				var maxMPrice=param.maxMPrice;
				if((miniArea!=null&&isNaN(miniArea))||(maxArea!=null&&isNaN(maxArea))||(miniPrice!=null&&isNaN(miniPrice))||(maxPrice!=null&&isNaN(maxPrice))||(miniMPrice!=null&&isNaN(miniMPrice))||(maxMPrice!=null&&isNaN(maxMPrice)))
				{
					alert("请输入有效数字");
					return ;
				}
				var direction=param.direction;
				var orderBy=param.orderBy;
				var keyword=param.keyword;
				var vive=param.vive;
				var pages=Math.ceil(hosList.total/hosList.pagesize);
				//steetCode type miniArea maxArea miniPrice maxPrice direction orderBy page
				var val=$(".housePagin li a.pagenum.active").attr("val");
				
				if(page==undefined){
					page=1;
				}				
				var reqs=hosList.getRequest();
				reqs['page']=page;			
				if(vive!=undefined){
					reqs['vive']=vive;				
				}
				if(steetCode!=undefined){
					if(steetCode=="all"){
						reqs['steetCode']="";
					}else{
						reqs['steetCode']=steetCode;
					}					
				}
				if(type!=undefined){
					if(type=="all"){
						reqs['type']="";
					}else{
						reqs['type']=type;
					}		
				}
				
				if(miniArea!==undefined||maxArea!==undefined){
					if(miniArea==null){
						miniArea="";
					}
					if(maxArea==null){
						maxArea="";
					}
					
					reqs['miniArea']=miniArea;	
					reqs['maxArea']=maxArea;	
				}
				if(miniPrice!==undefined||maxPrice!==undefined){
					if(miniPrice==null){
						miniPrice="";
					}
					if(maxPrice==null){
						maxPrice="";
					}
					reqs['miniPrice']=miniPrice;	
					reqs['maxPrice']=maxPrice;	
				}
				if(miniMPrice!==undefined||maxMPrice!==undefined){
					if(miniMPrice==null){
						miniMPrice="";
					}
					if(maxMPrice==null){
						maxMPrice="";
					}
					reqs['miniMPrice']=miniMPrice;	
					reqs['maxMPrice']=maxMPrice;	
				}
				if(direction!==undefined&&orderBy!==undefined){
					if(direction=="default"||direction=="DEFAULT"){
						reqs['direction']="";	
						reqs['orderBy']="";
					}else{
						reqs['direction']=direction;	
						reqs['orderBy']=orderBy;
					}
						
				}
				if(keyword!=undefined){
					reqs['keyword']=keyword;	
				}
				
				if("miniArea" in reqs &&"maxArea" in reqs)
				{
					if(parseFloat(reqs.maxArea)<parseFloat(reqs.miniArea))
					{
						alert("最大面积不能小于最小面积");
						return;
					}
				}
				if("miniPrice" in reqs &&"maxPrice" in reqs)
				{
					if(parseFloat(reqs.maxPrice)<parseFloat(reqs.miniPrice))
					{
						alert("最大租金不能小于最小租金");
						return;
					}
				}		
				if(unitCode!=undefined){
					if(unitCode=="default"){
						reqs['unitCode']="";
					}else{
						reqs['unitCode']=unitCode;
					}	
					
				}
				//设置分页器第一个显示的数字
				var url=window.location.href.split("?")[0];
				var strurl="";
				for(var it in reqs){
					if(it=="")
					{
						continue;
					}
					strurl+="&"+it+"="+reqs[it]
				}
				if(strurl.length>0){
					strurl="?"+strurl.substr(1);
				}
				window.location.href=url+strurl;
			},
			getRequest:function () { 
				var url = location.search; //获取url中"?"符后的字串 
				var theRequest = new Object(); 
				if (url.indexOf("?") != -1) { 
				var str = url.substr(1); 
				strs = str.split("&"); 
				for(var i = 0; i < strs.length; i ++) { 
				theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 
				} 
				} 
				return theRequest; 
			} ,
			bind:function(){
				//http://localhost:8080/sunproperty-war/portals/detail.do?guId=1
				
				//window.location.host; //返回url 的主机部分，例如：www.xxx.com:8080  
//				window.location.hostname; //返回www.xxx.com  
//				window.location.href; //返回整个url字符串(在浏览器中就是完整的地址栏)，例如：www.xxx.com/index.php?class_id=3&id=2  
//				window.location.pathname; //返回/a/index.php或者/index.php  
//				window.location.protocol; //返回url 的协议部分，例如： http:，ftp:，maito:等等。  
//				window.location.port //url 的端口部分，如果采用默认的80端口，那么返回值并不是默认的80而是空字符
				$(".houselist").on('click','.housename',function(){
					var $li=$(this).parents("li");
					var val=$li.attr("val");
					var strurl="";
					
					strurl="guId="+val;
					var url=window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/sunproperty-war/portals/detail.do?"+strurl;
					//window.location.href=url;
					window.open(url)
				})
				$(".houselist ").on("click",".seedetail",function(){
					var $li=$(this).parents("li");
					var val=$li.attr("val");
					var resourceid=$(this).attr("resourceid");
					var strurl="";
					
					
					if(resourceid){
						strurl+="&id="+resourceid;
						console.log(resourceid)
					}
					if($(this).hasClass("housearea-centerico")||$(this).hasClass("housearea-firstico")||$(this).hasClass("housearea-lastico")){
						strurl+="#type=resource";
					}				
					strurl="guId="+val+strurl;
					var url=window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/sunproperty-war/portals/detail.do?"+strurl;
					window.open(url)
				});
				$(".housetips ").on("click",".select li",function(){
					var $sel =$(this).parents(".select");
					if($sel.hasClass("unitselect")){
						var unitcode=$(this).attr("unitcode");
						hosList.getSearchUrl({unitCode:unitcode});
					}
					if($sel.hasClass("sortselect")){
						var direction=$(this).attr("direction");
						var orderby=$(this).attr("orderby");
						hosList.getSearchUrl({direction:direction.toUpperCase(),orderBy:orderby});
					}
				})
				$(".searchdiv a").on("click",function(){
					var val=trim($(".searchdiv input").val());
					var url='/sunproperty-war/portals/index.do?vive=list&keyword='+val;
					window.location.href=url;
					
				})
			/*	$(".head>a").on("click",function(){
					hosList.getSearchUrl({vive:"map"});
					return false;
					
				})*/
				$(".housePagin ").on("click","li a",function(){
					if($(this).hasClass("turnpage")){						
						var isPrev=$(this).hasClass("prev");
						if(isPrev){
							if($(this).hasClass("active")){
								var num=null;
								num=$(".pagenum.active").attr("val");
								hosList.getSearchUrl({pagenum:Number(num)-1,pagetype:"prev"});
							}else{
								return;
							}					
						}else{
							if($(this).hasClass("active")){
								var num=null;
								num=$(".pagenum.active").attr("val");
								hosList.getSearchUrl({pagenum:Number(num)+1,pagetype:"next"});
							}else{
								return;
							}
							
						}
					}else{
						var num=null;
						num=$(this).attr("val");
						hosList.getSearchUrl({pagenum:Number(num)});
					}
					
				})
				
				$(".seachlistPanel li").on("click","a",function(e) {
					if(e.stopPropagation){
						e.stopPropagation();
					}else{
						window.event.cancelBubble=true;
					}
					
					var $selgroup = $(this).parents(".selgroup");
					var  seltype=$selgroup.attr("type");				
					if (seltype == "sareas") {
						var miniarea = trim($selgroup.find("input.sel-areamin").val());
						var maxarea = trim($selgroup.find("input.sel-areamax").val());
						hosList.getSearchUrl({miniArea:miniarea,maxArea:maxarea});
					} else if (seltype == "samounts") {
						var li = $(this).parents("li");
						li.siblings().children("input").val("");
						var miniprice =trim( $selgroup.find("input.sel-pricemin").val());
						var maxprice = trim($selgroup.find("input.sel-pricemax").val());
						var minimprice =trim($selgroup.find("input.sel-mpricemin").val());
						var maxmprice = trim($selgroup.find("input.sel-mpricemax").val());
						if(li.attr("valuekey")=="price")
						{
							hosList.getSearchUrl({miniMPrice:"",maxMPrice:"",miniPrice:miniprice,maxPrice:maxprice});				
						}else
						{
							hosList.getSearchUrl({miniMPrice:minimprice,maxMPrice:maxmprice,miniPrice:"",maxPrice:""});				
						}
					}					
					return false;					
				});
				$(".seachlistPanel li").on("click",function() {
							if( $(this).find("input").length>0)
							{
								return ;
							}
							$(this).siblings().removeClass("active");
							$(this).addClass("active");
							var seltype = $(this).parents(".selgroup")
									.attr("type");
							var selval = $(this).attr("val");
							var selkey = "";
							if (seltype == "sstreetlist") {
								hosList.getSearchUrl({steetCode:selval});								
							} else if (seltype == "shousetypes") {							
								hosList.getSearchUrl({type:selval});
							} else if (seltype == "sareas") {
								var miniarea = $(this).attr("miniarea");
								var maxarea = $(this).attr("maxarea");
								 if(selval=="all"){
									hosList.getSearchUrl({miniArea:null,maxArea:null})
								}else if(miniarea==undefined&&maxarea==undefined){
									//点击了含有确认按钮的li
									return;
								}else{
									if(maxarea=="null"){
										maxarea="";
									}
									hosList.getSearchUrl({miniArea:miniarea,maxArea:maxarea});
								}
							} else if (seltype == "samounts") {
								
								var miniprice = $(this).attr("miniprice");
								var maxprice = $(this).attr("maxprice");
								var minimprice = $(this).attr("minimprice");
								var maxmprice = $(this).attr("maxmprice");
								(miniprice == null) ? miniprice="":miniprice= miniprice;
								(maxprice == null) ? maxprice="":maxprice= maxprice ;
								(minimprice == null) ? minimprice="": minimprice= minimprice;
								(maxmprice == null) ? maxmprice="":maxmprice= maxmprice ;
								 if(selval=="all"){
										hosList.getSearchUrl({miniPrice:null,maxPrice:null,miniMPrice:null,maxMPrice:null})
									} else{
									if(maxprice=="null"){
										maxprice="";
									}
									if(maxmprice=="null"){
										maxmprice="";
									}
									hosList.getSearchUrl({miniMPrice:minimprice,maxMPrice:maxmprice,miniPrice:miniprice,maxPrice:maxprice});
								}
							}
						});

				$(".houselist ").on('click',".picsumbtn,.pic-item,.picitem",function(e) {
					var $li=$(this).parents("li");
					var val=$li.attr("val");
					$(".carousel").addClass("hidden");
					if($("#sun-pics-carousel"+val).length>0){
						$("#sun-pics-carousel"+val).removeClass("hidden");
						var $carousel=$("#sun-pics-carousel"+val).data("sun.carousel");
						if($carousel!=null){
							$carousel.resize();
						}else{
							var html=hosList.carouselHtml(val);
							if(html!=""){
								$("body").append(html);								
								$("#sun-pics-carousel"+val).carousel();
								$("#sun-pics-carousel"+val).removeClass("hidden");
								var $carousel=$("#sun-pics-carousel"+val).data("sun.carousel");
								$carousel.resize();
							}else{
								
							}							
						}						
					}else{
						var html=hosList.carouselHtml(val);
						if(html!=""){
							$("body").append(html);								
							$("#sun-pics-carousel"+val).carousel();
							$("#sun-pics-carousel"+val).removeClass("hidden");
							var $carousel=$("#sun-pics-carousel"+val).data("sun.carousel");
							$carousel.resize();
						}
					}
				});
			},
			carouselHtml:function(dataid){
				var id=dataid;
				if(page!=null){
					//_thum.jpg
					
					for(var k=0;k<page.length;k++){
						var pictures=page[k].pictures;
						if(page[k].id!=dataid){
							continue;
						}
						if(pictures==null||pictures.length<=0){
							
						}else{
							var html="<div id='sun-pics-carousel"+id+"' class='carousel  slide hidden' data-ride='carousel'>" +
							"<div class='carousel-main'>" +
							"<div class='carousel-inner' >" +
							"";
							var mainpics="";
							var smallpics="";
							for(var i=0;i<pictures.length;i++){
								var pic=pictures[i];
								mainpics+="<div class='item "+(i==0?'active':'')+"'>";
								mainpics+="<img src='/sunproperty-war"+pic.uri+"' alt=''>";
								mainpics+="<div class='carousel-caption'></div>";
								mainpics+="</div>";
								smallpics+="<li data-target='#sun-pics-carousel"+id+"' data-slide-to='"+i+"' class='"+(i==0?'active':'')+"'>"
									+"<img  src='/sunproperty-war"+pic.uri+"_thum.jpg' alt=''>	</li>";
							}
							html+=mainpics;
							html+="</div>";
							html+="<a class='left carousel-control' href='#sun-pics-carousel"+id+"' > "
								+"<span class='glyphicon glyphicon-chevron-left' data-target='#sun-pics-carousel"+id
								+"' data-slide='prev'></span>	</a>	<a class='right carousel-control' href='#sun-pics-carousel"
								+id+"' > <span class='glyphicon glyphicon-chevron-right'  data-target='#sun-pics-carousel"+id
								+"' data-slide='next'></span></a>";
							html+="</div>	";
							html+="	<ol class='smallpics-wrap'>";
							html+=smallpics;
							html+="	</ol>";
							html+="	<a class='carousel-close' ><img src='/sunproperty-war/pc/picture/wid-close.png'></a>"
								+"</div>";
							
							return html;
							break;
						}
					}					
				}
				return "";
			}
	};
	
	hosList.init();
});

function resizeContentHeight(){
	var $body=$('body');
	  var bodyH=$body.height();
	  var $container=$('.container');
	  var headerH=$container.height();
	  
	  var searchH=$('.seachlistPanel').height();
	  var  tipsH=$('.housetips').height()
	  +Number($('.housetips').css('padding-top').replace("px",""))
	  +Number($('.housetips').css('padding-bottom').replace("px",""));
	  var  lineH=$('.hslist-line').height()
	  +Number($('.hslist-line').css('border-top-width').replace("px",""))
	  +Number($('.hslist-line').css('border-bottom-width').replace("px",""));
	  var  paginH=$('.housePagin').height()
	  +Number($('.housePagin').css('margin-top')!='auto'?$('.housePagin').css('margin-top').replace("px",""):'0')
	  +Number($('.housePagin').css('margin-bottom')!='auto'?$('.housePagin').css('margin-bottom').replace("px",""):'0');
	  var resultH=Number($('.houseresult').css('padding-top').replace("px",""))
			  +Number($('.houseresult').css('padding-bottom').replace("px",""));
	  var houselistH=Number($('.houselist').css('padding-top').replace("px",""))
		+Number($('.houselist').css('padding-bottom').replace("px",""));
	  var  copyrightH=$('.copyright').height()
	  		+Number($('.copyright').css('margin-top')!='auto'?$('.copyright').css('margin-top').replace("px",""):'0')
	  		+Number($('.copyright').css('margin-bottom')!='auto'?$('.copyright').css('margin-bottom').replace("px",""):'0')
			+Number($('.copyright').css('border-top-width').replace("px",""))
			+Number($('.copyright').css('border-bottom-width').replace("px",""))
			+Number($('.copyright').css('padding-top').replace("px",""))
			+Number($('.copyright').css('padding-bottom').replace("px",""));
	  var otherH=searchH+headerH+tipsH+lineH+paginH+(76+30)+copyrightH;
	  var userAgent = navigator.userAgent; 
	  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; 
	    
	  if(bodyH>otherH){
		  
		  var minH=bodyH-searchH-headerH-tipsH-lineH-paginH-resultH-copyrightH-houselistH;
		  if($('.houselist').length>0){
			  $('.houselist')[0].style.minHeight=minH+"px";
			 /* if(isIE){
				  $('.houselist')[0].style.height=minH+"px";
			  }*/
		  }
		 
	  }else{
		  if($('.houselist').length>0){
				  $('.houselist')[0].style.minHeight="0px";
				 /* if(isIE){
					  $('.houselist')[0].style.height="auto";
				  }*/
		  }
		  
	  }
}


window.onload=function(){  
	 resizeContentHeight();
}  
window.onresize=function(){  
	 resizeContentHeight();
}  
