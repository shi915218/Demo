
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>	
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page import="java.sql.*,java.util.*,java.net.URLEncoder"%>
<%
	String[] streets = { "米市巷街道", "湖墅街道", "小河街道", "和睦街道", "拱宸桥街道",
			"大关街道", "上塘街道", "祥符街道", "康桥街道", "半山街道" ,"其他"};
	String[] streetcodes = { "330105001000", "330105002000", "330105003000", "330105004000", "330105005000",
			"330105007000", "330105008000", "330105009000","330105010000", "330105011000","other" };
	String steetName = "街道";
	int steetindex = -1;
	String steetCode = request.getParameter("steetCode");
	steetCode=steetCode==null?"":steetCode;
	for (int i = 0; i < streetcodes.length; i++) {
		if (streetcodes[i].equals(steetCode)) {
			steetName = streets[i];
			steetindex = i;
			break;
		}
	}
	Object obj= pageContext.findAttribute("types");
	String[] types =(String[])obj;
	String[] typescodes = types;
	String typeName = "类型";
	int typeindex = -1;
	String type = request.getParameter("type");
	type=type==null?"":type;
	for (int i = 0; i < typescodes.length; i++) {
		if (typescodes[i].equals(type)) {
			typeName = types[i];
			typeindex = i;
			break;
		}
	}

	
	Object  unitobjs= pageContext.findAttribute("units");
	ArrayList unitlists =(ArrayList)unitobjs;
	String runitcode = null; 
	String runitname=null;
	String requnitCode = request.getParameter("unitCode");
	  requnitCode=requnitCode==null?"":requnitCode;
	for (int i = 0; i < unitlists.size(); i++) {
		Map m=(Map) unitlists.get(i);
		Object ucode=m.get("unitcode");
		String uscode=(String)ucode;
		if (uscode.equals(requnitCode)) {
			Object uuit=m.get("unit");
			runitname = (String)uuit;
			runitcode=uscode;
			break;
		}
	}  
	
	String[] areas = { "0-50㎡", "50-100㎡", "100-200㎡", "200-400㎡","400-1000㎡" , "1000㎡以上"  };
	String[] areascode = { "0","50", "100", "200", "400", "1000" };
	String areaName = "总面积";
	int areaindex = -1;
	String miniArea = request.getParameter("miniArea");
	miniArea=miniArea==null?"":miniArea;
	String maxArea = request.getParameter("maxArea");
	maxArea=maxArea==null?"":maxArea;
	boolean areaiscus = true;
	for (int i = 0; i < areascode.length-1; i++) {
		if (areascode[i].equals(miniArea)) {
			if (i != areascode.length - 1) {
				if (areascode[i + 1].equals(maxArea)) {
					areaName = areas[i];
					areaiscus = false;
					areaindex = i;
					break;
				}
			} else {
				areaName = types[i];
				areaiscus = false;
				areaindex = i;
				break;
			}

		}
	}
	if (areaiscus) {
		if ((miniArea != null && !("".equals(miniArea)))
				&& (maxArea != null && !("".equals(maxArea)))) {
			areaName = miniArea + "-" + maxArea + "㎡";
		}else
		{
			if (miniArea != null && !("".equals(miniArea))) {
				areaName = miniArea + "㎡以上";
			}
			if (maxArea != null && !("".equals(maxArea))) {
				areaName = maxArea + "㎡以下";
			}
		}
		
	}

	String[] prices1 = { "0-1元/㎡·天", "1-1.5元/㎡·天", "1.5-2元/㎡·天", "2-3元/㎡·天","3-5元/㎡·天", "5元/㎡·天以上" };
	String[] prices1codes =  { "0","1", "1.5", "2", "3", "5" };
	String pricesname = "租金";
	String miniPrice = request.getParameter("miniPrice");
	miniPrice=miniPrice==null?"":miniPrice;
	String maxPrice = request.getParameter("maxPrice");
	maxPrice=maxPrice==null?"":maxPrice;
	int price1index = -1;
	boolean price1iscus = true;
	for (int i = 0; i < prices1codes.length-1; i++) {
		if (prices1codes[i].equals(miniPrice)) {
			if (i != prices1codes.length - 1) {
				if (prices1codes[i + 1].equals(maxPrice)) {
					pricesname = prices1[i];
					price1iscus = false;
					price1index = i;
					break;
				}
			} else {
				pricesname = prices1[i];
				price1iscus = false;
				price1index = i;
				break;
			}

			break;
		}
	}
	if (price1iscus) {
		if ((miniPrice != null && !"".equals(miniPrice))
				&& (maxPrice != null && !"".equals(maxPrice))) {
			pricesname = miniPrice + "-" + maxPrice + "元/㎡·天";
		}else
		{
			if (miniPrice != null && !"".equals(miniPrice)) {
				pricesname = miniPrice + "元/㎡·天以上";
			}
			if (maxPrice != null && !"".equals(maxPrice)) {
				pricesname = maxPrice + "元/㎡·天以下";
			}
		}
		
	}

	
	String[] prices2 = { "0-30元/㎡·月", "30-45元/㎡·月", "45-60元/㎡·月", "60-90元/㎡·月","90-150元/㎡·月", "150元/㎡·月以上" };
	String[] prices2codes = { "0","30", "45", "60", "90", "150" };
	String miniMPrice = request.getParameter("miniMPrice");
	miniMPrice=miniMPrice==null?"":miniMPrice;
	String maxMPrice = request.getParameter("maxMPrice");
	maxMPrice=maxMPrice==null?"":maxMPrice;
	int price2index = -1;
	boolean price2iscus = true;
	for (int i = 0; i < prices2codes.length-1; i++) {
		if (prices2codes[i].equals(miniMPrice)) {
			if (i != prices2codes.length - 1) {
				if (prices2codes[i + 1].equals(maxMPrice)) {
					pricesname = prices2[i];
					price2iscus = false;
					price2index = i;
					break;
				}
			} else {
				pricesname = prices2[i];
				price2iscus = false;
				price2index = i;
				break;
			}

			break;
		}
	}
	if (price2iscus) {
		if ((miniMPrice != null && !"".equals(miniMPrice))
				&& (maxMPrice != null && !"".equals(maxMPrice))) {
			pricesname = miniMPrice + "-" + maxMPrice + "元/㎡·月";
		}else
		{
			if (miniMPrice != null && !"".equals(miniMPrice)) {
				pricesname = miniMPrice + "元/㎡·月以上";
			}
			if (maxMPrice != null && !"".equals(maxMPrice)) {
				pricesname = maxMPrice + "元/㎡·月以下";
			}
		}
		
	}
%>
<div class="select">
	<span names="steetCode" steetCode="<%=steetCode%>"><%=steetName%></span>
	<ul>
		<li keyvalue="街道" class="all">不限</li>
		<c:set var="steetindex" value="<%=steetindex%>"></c:set>
		<c:set var="streetcodes" value="<%=streetcodes%>"></c:set>
		<c:forEach var="street" items="<%=streets%>" varStatus="status">
			<c:choose>
				<c:when test="${steetindex==status.index}">
					<li steetCode="${streetcodes[status.index]}"  class="active">${street}</li>
				</c:when>
				<c:otherwise>
					<li steetCode="${streetcodes[status.index]}" >${street}</li>
				</c:otherwise>
			</c:choose>
		</c:forEach>
	</ul>
</div>
<div class="select sc">
	<span names="type" type="<%=type%>"><%=typeName%></span>
	<ul>
		<li keyvalue="类型" class="all">不限</li>
		<c:set var="typeindex" value="<%=typeindex%>"></c:set>
		<c:set var="typescodes" value="<%=typescodes%>"></c:set>
		<c:forEach var="type" items="<%=types%>" varStatus="status">
			<c:choose>
				<c:when test="${typeindex==status.index}">
					<li type="${typescodes[status.index]}" class="active">${type}</li>
				</c:when>
				<c:otherwise>
					<li type="${typescodes[status.index]}" >${type}</li>
				</c:otherwise>
			</c:choose>
		</c:forEach>
	</ul>
</div>
<div unit="㎡" class="select areainput">
	<span names="miniArea,maxArea" miniArea="<%=miniArea%>" maxArea="<%=maxArea%>"><%=areaName%></span>
	<ul>
		<li keyvalue="总面积" class="all">不限</li>
		<c:set var="areaindex" value="<%=areaindex%>"></c:set>
		<c:set var="areascode" value="<%=areascode%>"></c:set>
		<c:forEach var="area" items="<%=areas%>" varStatus="status">
			<c:choose>
				<c:when test="${areaindex==status.index}">
					<li miniArea="${areascode[status.index]}" maxArea="${areascode[status.index+1]}" class="active">${area}</li>
				</c:when>
				<c:otherwise>
					<li miniArea="${areascode[status.index]}" maxArea="${areascode[status.index+1]}" >${area}</li>
				</c:otherwise>
			</c:choose>
		</c:forEach>
		<li class="custom"><span class="twoinspan"> <c:choose>
					<c:when test="<%=price1iscus%>">
						<input value="<%=miniPrice%>" name="miniArea">
						<span>-</span>
						<input value="<%=maxPrice%>" name="maxArea">
					</c:when>
					<c:otherwise>
						<input name="miniArea">
						<span>-</span>
						<input name="maxArea">
					</c:otherwise>
				</c:choose>

		</span> <a class="btn">確定</a></li>
	</ul>
</div>
<div unit="元/㎡·天" class="select priceinput">
	<span names="miniPrice,maxPrice,miniMPrice,maxMPrice" miniPrice="<%=miniPrice%>" maxPrice="<%=maxPrice%>"><%=pricesname%></span>
	<ul>
		<li keyvalue="租金" class="all" value="租金">不限</li>
		<li class="menuli" names="miniPrice,maxPrice">按单价
			<ul>
				<c:set var="price1index" value="<%=price1index%>"></c:set>
				<c:set var="prices1codes" value="<%=prices1codes%>"></c:set>
				<c:forEach var="price1" items="<%=prices1%>" varStatus="status">
					<c:choose>
						<c:when test="${price1index==status.index}">
							<li miniPrice="${prices1codes[status.index]}" maxPrice="${prices1codes[status.index+1]}" class="active">${price1}</li>
						</c:when>
						<c:otherwise>
							<li miniPrice="${prices1codes[status.index]}" maxPrice="${prices1codes[status.index+1]}">${price1}</li>
						</c:otherwise>
					</c:choose>
				</c:forEach>
				<li class="custom"><span class="twoinspan"> <c:choose>
							<c:when test="<%=price1iscus%>">
								<input value="<%=miniPrice%>" name="miniPrice">
								<span>-</span>
								<input value="<%=maxPrice%>" name="maxPrice">
							</c:when>
							<c:otherwise>
								<input name="miniPrice">
								<span>-</span>
								<input name="maxPrice">
							</c:otherwise>
						</c:choose>

				</span> <a class="btn">確定</a></li>
			</ul>
		</li>
		<li class="menuli" names="miniMPrice,maxMPrice" >按月
			<ul>
				<c:set var="price2index" value="<%=price2index%>"></c:set>
				<c:set var="prices2codes" value="<%=prices2codes%>"></c:set>
				<c:forEach var="price2" items="<%=prices2%>" varStatus="status">
					<c:choose>
						<c:when test="${price2index==status.index}">
							<li miniMPrice="${prices2codes[status.index]}" maxMPrice="${prices2codes[status.index+1]}" class="active">${price1}</li>
						</c:when>
						<c:otherwise>
							<li miniMPrice="${prices2codes[status.index]}" maxMPrice="${prices2codes[status.index+1]}">${price2}</li>
						</c:otherwise>
					</c:choose>
				</c:forEach>
				<li class="custom"><span class="twoinspan"> <c:choose>
							<c:when test="<%=price2iscus%>">
								<input value="<%=miniMPrice%>" name="miniMPrice">
								<span>-</span>
								<input value="<%=maxMPrice%>" name="maxMPrice">
							</c:when>
							<c:otherwise>
								<input name="miniMPrice">
								<span>-</span>
								<input name="maxMPrice">
							</c:otherwise>
						</c:choose>
				</span> <a class="btn">確定</a></li>
			</ul>
		</li>
	</ul>
</div>
<div class="select unitselect">
	
	<c:set var="runitname" value="<%=runitname%>"></c:set>
	<c:set var="runitcode" value="<%=runitcode%>"></c:set>
	<c:choose>
		<c:when test="${(not empty runitcode)}">			
			<span names="unitCode" unitCode="${runitcode}">${runitname}</span>
			<ul>
			<li keyvalue="主管单位"  unitCode="" >不限</li>		
			<c:forEach items="${requestScope.units}" varStatus="i" var="uitem">
			<c:choose>		
				<c:when test="${runitcode==uitem.unitcode}">
					<li unitCode="${uitem.unitcode}" class="active">${uitem.unit}</li>		
				</c:when>
				<c:otherwise>
					<li unitCode="${uitem.unitcode}" >${uitem.unit}</li>		
				</c:otherwise>
			</c:choose>
							
			</c:forEach>
			</ul>	
		</c:when>
		<c:otherwise>
			<span names="unitCode" unitCode="">主管单位</span>
			<ul>
				<li keyvalue="主管单位"  unitCode="" class="active">不限</li>
				<c:forEach items="${requestScope.units}" varStatus="i" var="uitem">
					<li unitCode="${uitem.unitcode}">${uitem.unit}</li>						
				</c:forEach>
			</ul>	
		</c:otherwise>
	
	</c:choose>
		
					
	
</div>
<a href="/sunproperty-war/portals/index.do">清除全部条件</a>