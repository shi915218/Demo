<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<span class="tigger"></span>
<div class="sum">
	为您找到<em>${requestScope.page.total}</em>套房子
</div>
<div class="sort">
<c:set var="orderBy" value='<%=request.getParameter("orderBy")%>'></c:set>
<c:set var="direction" value='<%=request.getParameter("direction")%>'></c:set>

	<c:choose>
		<c:when test="${orderBy=='price'}">
			<c:choose>
			<c:when test="${direction=='DESC'}">
			<a orderBy="" class="panbtn ">默认</a> <a orderBy="price"
		class="panbtn active DESC" direction="DESC">租金<span></span></a>
			</c:when>
			<c:otherwise>
			<a orderBy="" class="panbtn ">默认</a> <a orderBy="price"
		class="panbtn active ASC" direction="ASC" >租金<span></span></a>
			</c:otherwise>
			</c:choose>
		</c:when>
		<c:otherwise>
		<a orderBy="" class="panbtn active">默认</a> <a orderBy="price"
		class="panbtn">租金<span></span></a>
	</c:otherwise>
	</c:choose>
</div>
<div class="list">
	<ul>
		<c:forEach var="b" items="${requestScope.page.rows}">
			<li value="${b.id }">
				<c:choose>
					<c:when test="${fn:length(b.pictures) <= 0}">
					<a target="_blank" href="/sunproperty-war/portals/detail.do?guId=${b.id}">
						<div class="buildimg"
							style="background-image: url(/sunproperty-war/pc/core/assets/nopic.png)"></div>
					</a>
					</c:when>
					<c:otherwise>
					<a target="_blank" href="/sunproperty-war/portals/detail.do?guId=${b.id}">
						<div class="buildimg"
							style="background-image:url(/sunproperty-war${b.pictures[0].uri}_thum.jpg)"></div>
							</a>
					</c:otherwise>
				</c:choose>
				<div class="buildinfo">
					<p class="buildname">
						<a target="_blank" href="/sunproperty-war/portals/detail.do?guId=${b.id}">${b.name}</a>
					</p>
					<p>
					<c:choose>
						<c:when test="${empty b.price ||b.price==0}">
						<span class="buildprice">暂无</span>
						<span
							class="buildarea"></span>
						</c:when>
						<c:otherwise>
						<fmt:formatNumber value="${b.price}" var="price"
							maxFractionDigits="2" minFractionDigits='0' groupingUsed="false" />
						<span class="buildprice">${price}元/㎡·天</span> <span
							class="buildarea">${b.area}㎡</span>
						</c:otherwise>
					</c:choose>
					</p>
					<div class="buildaddress"><span></span><div class="addr" >地址：${b.address}</div></div>
				</div></li>
		</c:forEach>
	</ul>
</div>
