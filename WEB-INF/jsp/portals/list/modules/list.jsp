<%@ page contentType="text/html; charset=utf-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page import="java.sql.*,java.util.*,java.net.URLEncoder"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>拱墅区行政事业单位房产信息</title>
<script>
	var page = ${requestScope.page.rows};
</script>
</head>
<body>
	<%
		String[] streets = { "米市巷街道", "湖墅街道", "小河街道", "和睦街道", "拱宸桥街道", "大关街道", "半山街道", "康桥街道", "上塘街道", "祥符街道","其他"};

		String[] streetcodes = { "330105001000", "330105002000", "330105003000", "330105004000"
				, "330105005000", "330105007000", "330105011000",
			"330105010000", "330105008000" ,"330105009000","other"};
	
		Object obj= pageContext.findAttribute("types");
		String[] housetypes =(String[])obj;
		
		//String[] housetypes = { "办公用房", "管理用房", "商铺", "住宅", "库房", "其他" };
		String[] typescodes = housetypes;//{ "1", "2", "3", "4", "5", "6" };

		String[] areas = { "0-50㎡", "50-100㎡", "100-200㎡", "200-400㎡","400-1000㎡" , "1000㎡以上"  };
		String[] areascode = { "0","50", "100", "200", "400", "1000" };
		
		String[] amounts = { "0-1元/㎡·天", "1-1.5元/㎡·天", "1.5-2元/㎡·天", "2-3元/㎡·天","3-5元/㎡·天", "5元/㎡·天以上" };
		String[] prices1codes = { "0","1", "1.5", "2", "3", "5" };
		
		String[] amounts2 = { "0-30元/㎡·月", "30-45元/㎡·月", "45-60元/㎡·月", "60-90元/㎡·月","90-150元/㎡·月", "150元/㎡·月以上" };
		
		String[] prices2codes = { "0","30", "45", "60", "90", "150" };
		
		
		String mapurl=request.getContextPath()+"/portals/index.do" + "?vive=map&";
	    Enumeration paramNames = request.getParameterNames();  
	    while (paramNames.hasMoreElements()) {  
	      String paramName = (String) paramNames.nextElement();  
	      if(paramName.equals("vive"))
	      {
	    	  continue;
	      }
	      String[] paramValues = request.getParameterValues(paramName);  
	      if(paramValues.length == 1) {  
	        String paramValue = paramValues[0]; 
	        if("type".equals(paramName)||"keyword".equals(paramName))
	        {
	        	paramValue=URLEncoder.encode(paramValue,"UTF-8");
	        }
	        if (paramValue.length() != 0) {
	        	mapurl+=paramName+"="+paramValue+"&";
	        }  
	      }  
	    } 
	    mapurl=mapurl.substring(0, mapurl.length()-1);
		
		
	%>

	<c:set var="pagesize" scope="session" value="1"/>
 	<c:set var="streetcodes" scope="session" value="<%=streetcodes%>"/> 
 	<c:set var="typescodes" scope="session" value="<%=typescodes%>"/> 
 	<c:set var="areascode" scope="session" value="<%=areascode%>"/> 
 	<c:set var="prices1codes" scope="session" value="<%=prices1codes%>"/>
 	 <c:set var="prices2codes" scope="session" value="<%=prices2codes%>"/>
	<div class="seachlistPanel">
		<div class="maskpanel">
		<div type="sstreetlist" class="selgroup">
			<span class="seltype">街道：</span>
			<ul class="horizontal">
				<li class="selall searchsel active" val="all"  ><span>全部</span></li>
				<c:forEach items="<%=streets%>" varStatus="i" var="item">
					<li class='searchsel'  val="${streetcodes[i.index]}" ><span>${item}</span></li>
				</c:forEach>
			</ul>
		</div>

		<div type="shousetypes" class="selgroup">

			<span class="seltype">类型：</span>			 
			<ul class="horizontal">			
				<li style="position:absolute"  class="selall searchsel active" val="all"  ><span>全部</span></li>
				<ul style="padding-left:43px">
                    <c:forEach items="<%=housetypes%>" varStatus="i" var="item">
                        <li  class='searchsel' val="${typescodes[i.index]}"><span>${item}</span></li>
                    </c:forEach>
                </ul>

			</ul>
		</div>

		<div type="sareas" class="selgroup">
			<span class="seltype">面积：</span>
			<ul class="horizontal">
				<li class="selall searchsel active" val="all" ><span>全部</span></li>
				<c:forEach items="<%=areas%>" varStatus="i" var="item">
				
				<c:choose>
					<c:when test="${i.index<fn:length(areascode) -1}">
						<li class='searchsel' miniArea="${areascode[i.index]}"  maxArea="${areascode[i.index+1]}" ><span>${item}</span></li>
					</c:when>
					<c:when test="${i.index==fn:length(areascode) -1}">
						<li class='searchsel'  miniArea="${areascode[i.index]}"  maxArea="null"><span>${item}</span></li>
					</c:when>
				</c:choose>
			 
				</c:forEach>
				<li style='cursor:default;'><span><input type="text" class="sel-input sel-areamin"><span>-</span><input
						type="text" class="sel-input sel-areamax"><span>㎡</span><a
						class="btn primary-btn"   >确定</a></span></li>
			</ul>
		</div>

		<div type="samounts" class="selgroup">

			<span class="seltype">租金：</span>
			<ul class="horizontal">
				<li class="selall searchsel active" val="all" ><span>全部</span></li>
				<c:forEach items="<%=amounts%>" varStatus="i" var="item">
				
				<c:choose>
					<c:when test="${fn:length(prices1codes) -1>i.index}">
						<li class='searchsel' miniPrice="${prices1codes[i.index]}"   maxPrice="${prices1codes[i.index+1]}" ><span>${item}</span></li>
					</c:when>
					<c:when test="${fn:length(prices1codes) -1==i.index}">
						<li class='searchsel' miniPrice="${prices1codes[i.index]}" maxPrice="null" ><span>${item}</span></li>
					</c:when>
				</c:choose> 
				
				<%-- 
					<li val="${prices1codes[i.index]}"><span>${item}</span></li> --%>
				</c:forEach>
				<li valuekey="price" style="cursor:default;"><span> <input type="text" class="sel-input sel-pricemin"><span>-</span><input
						type="text" class="sel-input sel-pricemax"><span>元/㎡·天
					</span><a class="btn primary-btn" >确定</a>
				</span></li>
			<br>
				<li class="selall searchsel active" val="all" ><span style="display:inline-black;width:24px;"></span></li>
				<c:forEach items="<%=amounts2%>" varStatus="i" var="item">
				
				<c:choose>
					<c:when test="${fn:length(prices2codes) -1>i.index}">
						<li class='searchsel' miniMPrice="${prices2codes[i.index]}"   maxMPrice="${prices2codes[i.index+1]}" ><span>${item}</span></li>
					</c:when>
					<c:when test="${fn:length(prices1codes) -1==i.index}">
						<li class='searchsel' miniMPrice="${prices2codes[i.index]}" maxMPrice="null" ><span>${item}</span></li>
					</c:when>
				</c:choose> 
				
				<%-- 
					<li val="${prices1codes[i.index]}"><span>${item}</span></li> --%>
				</c:forEach>
				<li  valuekey="mprice" style="cursor:default;"><span> <input type="text" class="sel-input sel-mpricemin"><span>-</span><input
						type="text" class="sel-input sel-mpricemax"><span>元/㎡·月
					</span><a class="btn primary-btn" >确定</a>
				</span></li>
			</ul>
		</div>
		</div>
	</div>
	<!-- <div class="seachlistPanelbottom"></div> -->
	<!-- 	<div class="houseresultpanel"> -->
	<div class="houseresult">
		<div class="housetips">
			<div>
				<div class='tipsall'>为您找到<span class="em-font">${requestScope.page.total}</span>套房产 </div>
				 <a href="<%=mapurl %>"  class='tomap'><img style="" alt="" src="/sunproperty-war/pc/list/assets/tomap.png"><span>地图找房</span></a>	
			
				
			</div>
			<div class="rightdiv">
					<div class="select unitselect">
						<span>主管单位</span>
						<ul>
						<li keyvalue="主管单位" unitcode="default">不限</li>		
						
							<c:forEach items="${requestScope.units}" varStatus="i" var="uitem">
								<li unitcode="${uitem.unitcode}">${uitem.unit}</li>						
							</c:forEach>					
						</ul>
					</div>
				<div class="select sortselect">
					<span>默认排序</span>
					<ul>				
						<li direction="default" orderby="">默认排序</li>	
						<li direction="desc" orderby="price">租金从高到低</li>				
						<li direction="asc" orderby="price">租金从低到高</li>	
					</ul>
				</div>
				
			</div>
		</div>
		<hr class="hslist-line">
		
		<div class="houselist">
	
			<ul>
				<c:forEach items="${requestScope.page.rows}" varStatus="i" var="item">
					<li val="${item.id}">		
					<%--  <div>${item}</div> --%>		
						<div class="house-row">
							<div class="house-row-item house-item1">
								<c:choose>
									<c:when test="${fn:length(item.pictures)<1}">
									<div class='picitem' style="background-image: url(/sunproperty-war/pc/core/assets/nopic.png)">
										
									</div>
									</c:when>
									<c:otherwise>
									<div class='picitem' style="background-image: url(/sunproperty-war${item.pictures[0].uri}_thum.jpg)">
										
											<a class="btn picsumbtn">共<span class="">${item.pictures.size()}</span>张
											</a>
										</div>
									</c:otherwise>
								</c:choose>
							</div>
							<div class="house-row-item house-item-center">
								<div class="housenamediv"><span class="housename">${item.name}</span></div>
								<div class="houseaddr">
								<c:if test="${item.street!=null}">
								<span class="hslist-street">${item.street}</span>
								</c:if>
									<span
										class="hslist-detailaddr">${item.address}</span>
								</div>
								<fmt:formatNumber value="${item.rentArea}" var="rentArea"
									maxFractionDigits="2" minFractionDigits='0' groupingUsed="false" />
								<fmt:formatNumber value="${item.area}" var="area"
									maxFractionDigits="2" minFractionDigits='0' groupingUsed="false" />
									
								<div class="housesent">
								已出租/总面积：<span class="hslist-availarea">${rentArea}/${area}</span>㎡
								</div>
								<c:choose>
								<c:when test="${item.resources.total!=0}">
									<div class="housealrent font-def"><span>${item.resources.total}</span>个房源已租</div>
								</c:when>
								<c:otherwise>
									<div class="housealrent font-def">暂时无房源出租</div>
								</c:otherwise>
								</c:choose>
								<div class="housearealist">
									<c:forEach items="${item.resources.rows}" var="itarea"
										varStatus="ind">
										<c:if test="${ind.index <=0}">
											<span val="${itarea.area}" resourceid="${itarea.id}" class="housearea-firstico seedetail"><span class="bf"></span><span>${itarea.area}㎡</span><span class="af"></span></span>
										</c:if>
										<c:if test="${ind.index >0 && ind.index<4}">
											<span val="${itarea.area}" resourceid="${itarea.id}" class="housearea-centerico seedetail"><span class="bf"></span><span>${itarea.area}㎡</span><span class="af"></span></span>
										</c:if>
									</c:forEach>
									<c:if test="${item.resources.total >=1}">
										<span class="housearea-lastico seedetail"><span class="bf"></span><span>更多&nbsp;></span><span class="af"></span></span>
									</c:if>
									
								</div>
							</div>
							<div class="house-row-item" style="width: 150px;">
								<a class="btn primary-btn big-btn seedetail">查看详情</a>
							</div>
						</div>
					</li>  
				</c:forEach>
			</ul>	
		</div>
		<div class="housePagin"></div>
		<div class='copyright'>
			<div>Copyright2016 中科天翔（杭州）科技有限公司 技术服务热线400-185-0505</div>
		</div>
		 <div class="powerDiv">
			<div style="width:300px;margin:0 auto; padding:20px 0;">
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502004120" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="/sunproperty-war/pc/core/assets/powerLogo.jpg" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#000000;">浙公网安备 33010502004120号</p></a>
		 	</div>
		 </div>
	</div>
	<!-- </div> -->
	<%-- <c:forEach items="${requestScope.page.rows}" varStatus="i" var="item">	
		<c:choose>
			<c:when test="${fn:length(item.pictures)<1}">
				
			</c:when>
			<c:otherwise>
			<div id='sun-pics-carousel${item.id}' class='carousel  slide hidden' data-ride='carousel'>	
				<div class='carousel-main'>
					<div class='carousel-inner' >
						<c:forEach var="picitem" items="${item.pictures}" varStatus="pici">
							<c:choose>
								<c:when test="${pici.index==0}">
									<div class='item active'>
										<img src='/sunproperty-war${picitem.uri}' alt=''>
										<div class='carousel-caption'></div>
									</div>
								</c:when>
								<c:otherwise>
									<div class='item '>
										<img src='/sunproperty-war${picitem.uri}' alt=''>
										<div class='carousel-caption'></div>
									</div>
								</c:otherwise>
							</c:choose>
						</c:forEach>
					</div>
				<a class='left carousel-control' href='#sun-pics-carousel${item.id}' > 
				<span class='glyphicon glyphicon-chevron-left' data-target='#sun-pics-carousel${item.id}' data-slide='prev'></span>				
				</a>
				<a class='right carousel-control' href='#sun-pics-carousel${item.id}' > 
				<span class='glyphicon glyphicon-chevron-right'  data-target='#sun-pics-carousel${item.id}' data-slide='next'></span>				
				</a>
			</div>	

			<ol class='smallpics-wrap'>	
				<c:forEach var="picitem" items="${item.pictures}" varStatus="pici">
				<c:choose>
					<c:when test="${pici.index==0 }">
						<li data-target='#sun-pics-carousel${item.id}' data-slide-to='${pici.index}' class='active'>
							<img  src='/sunproperty-war${picitem.uri}_thum.jpg' alt=''>
						</li>
					</c:when>
					<c:otherwise>
						<li data-target='#sun-pics-carousel${item.id}' data-slide-to='${pici.index}' class=''>
							<img  src='/sunproperty-war${picitem.uri}_thum.jpg' alt=''>
						</li>
					</c:otherwise>
				</c:choose>
				</c:forEach>
					</ol>
				<a class='carousel-close' ><img src='../pc/picture/wid-close.png'></a>
			</div>
				</c:otherwise>
		</c:choose>	
		
</c:forEach> --%>
</body>
</html>