<!DOCTYPE HTML>
<html>
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="renderer" content="webkit|ie-standcomp|ie-comp">
<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
<title>拱墅区阳光房产信息公开</title>
<link rel="stylesheet" type="text/css"
	href="/sunproperty-war/pc/detail/css/common.css">
<link rel="stylesheet"
	href="/sunproperty-war/pc/detail/skippr/css/jquery.skippr.css">
<link rel="stylesheet" type="text/css"
	href="/sunproperty-war/pc/core/css/core.css">
<link rel="stylesheet" type="text/css"
	href="/sunproperty-war/pc/core/css/header1.css">
<link rel="stylesheet" type="text/css"
	href="/sunproperty-war/pc/detail/css/detail.css">
<script src="/sunproperty-war/pc/core/js/jquery-1.9.1.min.js"></script>
<script src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js"></script>
<script src="/sunproperty-war/pc/detail/skippr/js/jquery.skippr.js"></script>
<script src="/sunproperty-war/pc/core/js/ajax.js"></script>
<script src="/sunproperty-war/pc/detail/js/detail.js"></script>
<script src="/sunproperty-war/pc/core/js/jquery.placeholder.min.js"></script>
<script src="/sunproperty-war/pc/core/js/respond.min.js"></script>
<script src="/sunproperty-war/pc/core/js/html5shiv.min.js"></script>
<!--[if IE 8]>
 <script src="/sunproperty-war/pc/core/js/jquery.backgroundcover.min.js"></script>
<![endif]-->
<script>
	
<%String guId = request.getParameter("guId");%>
	var guId =
<%=guId%>
	
</script>
</head>
<body>
	<c:set var="building" value="${requestScope.building}"></c:set>
	<%
		request.setCharacterEncoding("UTF-8");
	%>
	<div class="container">
		<div class="header">
			<jsp:include page="content/header.jsp" />
		</div>		
		<div class="banner">
			<div class="housePic">
				<div id="theTarget" value="${fn:length(building.pictures)}">
					<c:choose>
						<c:when test="${fn:length(building.pictures) <= 0}">
							<div class="buildimg"
								style="background-image: url(/sunproperty-war/pc/core/assets/nopic_b.png)"></div>
						</c:when>							
						<c:otherwise>
							<c:forEach var="picture" items="${building.pictures}">				
								<div style="background-image: url(/sunproperty-war${picture.uri});">
								</div>
							</c:forEach>
						</c:otherwise>
					</c:choose>
				</div>
				<div class="namepanout">
				<div class="namepan">
					<span class="name">${building.name}</span>
					<span  class="adress">${building.address}</span>
				</div>
				</div>

			</div>
		</div>
		<div class="detail">
			<div class="tag">
				<ul>
					<li class="tag_houseIntroduce active" value="houseIntroduce"><a
						>房产介绍</a></li>
					<li class="tag_houseAround" value="houseAround"><a >周边设施</a></li>
					<li class="tag_houseLend" value="houseLend"> <a >出租房源</a></li>
					<li class="tag_other" value="other"><a >其他房源推荐</a></li>
				</ul>
				<div class="tag_underline"></div>
			</div>
			<div class="tagpos"></div>
			<!--S=房产介绍-->
			<div class="houseIntroduce" id="houseIntroduce">
				<h3>房产介绍</h3>
				<div class="houseIntroduce_underline"></div>
				<div class="houseIntroduce_content">
					<table>
						<tr>
							<td>负责单位：<span class="mleft">${building.unit}</span></td>
							<td>联系方式：<span class="mleft">${building.unitTel}</span></td>
						</tr>
						<tr>
							<fmt:formatNumber value="${building.area}" var="area1" maxFractionDigits="2" minFractionDigits='0'  groupingUsed="false"/>
						
							<td>房产面积：<span class="mleft">${area1}&nbsp;平方米</span></td>
							<fmt:formatNumber value="${building.price}" var="price1" maxFractionDigits="2" minFractionDigits='0'  groupingUsed="false"/>
						
							<td>均<font style="padding-left:24px"></font>价：<span class="mleft">${price1}<span>元/m</span>&sup2;·天
							</span></td>
						</tr>
					
					</table>
				</div>
			</div>
			<!--E=房产介绍-->

			<!--S=房源周边-->
			<div class="houseAround" id="houseAround">
				<c:set var="facility" value="${requestScope.building.facility}"></c:set>
				<c:set var="transit" value="${facility.transit}"></c:set>
				<c:set var="catering" value="${facility.catering}"></c:set>
				<c:set var="entertainment" value="${facility.entertainment}"></c:set>
				<c:set var="shopping" value="${facility.shopping}"></c:set>
				<h3>周边设施</h3>
				<div class="houseAround_underline"></div>
				<div class="houseAround_content">				
					 <table>
                              <tr>
                                   <td class="th">公<font style="padding-left:24px"></font>交&nbsp;:</td>
                                   <td class="houseAround_content_d">${fn: replace(transit,";","&nbsp;&nbsp;&nbsp;")}</td>
                              </tr>
                              <tr>
                                   <td class="th">餐<font style="padding-left:24px"></font>饮&nbsp;:</td>
                                   <td class="houseAround_content_d">${fn: replace(catering,";","&nbsp;&nbsp;&nbsp;")}</td>
                               </tr>
                               <tr>
                                  <td class="th">购<font style="padding-left:24px"></font>物&nbsp;:</td>
                                  <td class="houseAround_content_d">${fn: replace(shopping,";","&nbsp;&nbsp;&nbsp;")}</td>
                               </tr>
      
                              <tr>
                                  <td class="th">休闲娱乐&nbsp;:</td>
                                  <td class="houseAround_content_d">${fn: replace(entertainment,";","&nbsp;&nbsp;&nbsp;")}</td>
                             </tr>
                            </table>
	                  </div>
			</div>
			<!--E=房源周边-->

			<!--S=房源出租-->
			<div class="houseLend" id="houseLend">
				<div class="houseLend_nav">
					<h3 class="fl">出租房源</h3>
					<div class="houseLend_nav_c">
						<div class="fl statusDiv">
							<span class="lend_status">出租状态：</span> <a class="btn_all"
								id="all">全部</a> <a class="btn_retainArea" type="0"
								id="retainArea">自用</a><a class="btn_rentArea" type="3"
								id="rent">招租中</a> <a class="btn_expire" type="1"
								id="expire">将到期</a> <a class="btn_rentArea" type="2"
								id="rentArea">已出租</a>
								
						</div>
						<div class="fr sortDiv">
							<span class="lend_sort">排序：</span> <a class="btn_default"
								id="default">默认</a> <a class="btn_price" orderBy="price"
								id="price"> 出租金额<span class="sortde"></span>
							</a> <a class="btn_updateTime" orderBy="updateTime" id="updateTime">
								更新时间<span class="sortde"></span>
							</a>
						</div>
					</div>
				</div>
				<div class="houseLend_underline"></div>
				<div class="houseLend_detail">

					<c:forEach var="row" items="${building.resources.rows}">
						<c:if test="${row.type=='0'}">
							<div class="fl houseLend_detail_l">
								<div class="h_header">
									<div class=" fl h_header_l">自用</div>
									<div class=" fr h_header_r">
									<fmt:formatNumber value="${row.area}" var="area" maxFractionDigits="2" minFractionDigits='0'  groupingUsed="false"/>
						
										<font color="red">${area}</font>m&sup2;
									</div>
								</div>
								<div class="h_desc">本房源为主管单位自用房，暂不出租</div>
							</div>
						</c:if>
						<c:if test="${row.type!='0'&&row.status=='将到期'}">
							<c:set var="classname" value="houseLend_detail_m"></c:set>
						</c:if>
						<c:if test="${row.type!='0'&&row.status=='已出租'}">
							<c:set var="classname" value="houseLend_detail_r"></c:set>
						</c:if>
						<c:if test="${row.type==4}">
							<c:set var="classname" value="houseLend_detail_o"></c:set>
						</c:if>
						<fmt:formatNumber value="${row.price}" var="price" maxFractionDigits="2" minFractionDigits='0'  groupingUsed="false"/>
						<fmt:formatNumber value="${row.area}" var="rarea" minFractionDigits="0" groupingUsed="false"/> 
						<c:if test="${classname!=null}">
							<div class=" fl ${classname}">
								<div class="h_header">
									<div class=" fl h_header_l">${row.status}</div>
									<div class=" fl h_header_r">
										<span><font color="red">${rarea }</font>m&sup2;</span> <font
											color="red">${price}</font>元/m&sup2;·天

									</div>
								</div>
								<c:set var="line" value="2"></c:set>
								<c:if
									test="${row.paymentMethod==null&&row.mPrice==null&&row.otherInfo==null}">
									<c:set var="line" value="${line-1}"></c:set>
								</c:if>
								<c:if test="${row.startTime==null&&row.endTime==null}">
									<c:set var="line" value="${line-1}"></c:set>
								</c:if>
								<div class="h_desc line_${line}">
									<c:if
										test="${row.paymentMethod!=null||row.mPrice!=null||row.otherInfo!=null}">
										<p>
											<span>出租信息</span>
											<c:if test="${row.paymentMethod!=null}">
												<span>${row.paymentMethod}</span>
												<c:if test="${row.mPrice!=null||row.otherInfo!=null}">
													<span>|</span>
												</c:if>
											</c:if>
											<c:if test="${row.mPrice!=null}">
											<fmt:formatNumber value="${row.mPrice}" var="mPrice" maxFractionDigits="2" minFractionDigits='0' groupingUsed="false"/>
												<span>${mPrice}元/月</span>
												<c:if test="${row.otherInfo!=null}">
													<span>|</span>
												</c:if>
											</c:if>
											<c:if test="${row.otherInfo!=null}">
												<span>${row.otherInfo}</span>
											</c:if>
										</p>
									</c:if>
									<c:if test="${row.startTime!=null||row.endTime!=null}">
										<p>
											<span>出租时间</span>
											<c:if test="${row.startTime!=null&&row.endTime==null}">
												<span>从${row.startTime}起</span>
											</c:if>
											<c:if test="${row.startTime==null&&row.endTime!=null}">
												<span>到${row.endTime}截止</span>
											</c:if>
											<c:if test="${row.startTime!=null&&row.endTime!=null}">
												<span>${row.startTime}~${row.endTime}</span>
											</c:if>
										</p>
									</c:if>
									<c:if test="${line<2}">
										<p><span>本房源其他出租信息正在努力整理中</span>></p>
									</c:if>

								</div>
							</div>
						</c:if>


					</c:forEach>
				</div>
				<div style="clear: both"></div>
				<c:choose>
					<c:when
						test="${fn:length(building.resources.rows)>=building.resources.total}">
						<div class="houseLend_detail_more" style="display: none;">
							显示更多<span></span>
						</div>
					</c:when>
					<c:otherwise>
						<div class="houseLend_detail_more">
							显示更多<span></span>
						</div>
					</c:otherwise>
				</c:choose>
			</div>
			<!--E=房源出租-->

			<div class="other" id="other">
				<h2>其他房产推荐</h2>
				<div class="other_underline"></div>
			</div>
			<div class="other_detail">
				<span class="fl leftdown"><!-- <img
					src="/sunproperty-war/pc/detail/assets/leftdown.png">-->
					</span> 
				<div class="fl">
					<div class="fl other_detailInfo"></div>
				</div>
				<span class=" fr rightdown"> <!-- <img
					src="/sunproperty-war/pc/detail/assets/rightdown.png"> -->
				</span>
			</div>
		</div>
		
		<!--S=版本信息-->
		<div class="copyright">
			<div>Copyright2016 中科天翔（杭州）科技有限公司 技术服务热线400-185-0505</div>
		</div>
		<div class="powerDiv">
		 	<div style="width:300px;margin:0 auto; padding:20px 0;">
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502004120" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="/sunproperty-war/pc/core/assets/powerLogo.jpg" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#000000;">浙公网安备 33010502004120号</p></a>
		 	</div>
		 </div>
		<!--E=版本信息-->	
</body>
</html>