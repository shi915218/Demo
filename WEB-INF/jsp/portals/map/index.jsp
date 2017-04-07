<!DOCTYPE HTML>
<html>
<head>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="renderer" content="webkit|ie-standcomp|ie-comp">
<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
<title>拱墅区阳光房产信息公开</title>
<link type="text/css" rel="stylesheet"
	href="/sunproperty-war/pc/core/css/core.css"></link>
<link type="text/css" rel="stylesheet"
	href="/sunproperty-war/pc/core/css/header.css"></link>
<link type="text/css" rel="stylesheet"
	href="/sunproperty-war/pc/map/css/map.css"></link>
<link type="text/css" rel="stylesheet"
	href="/sunproperty-war/pc/map/css/mappan.css"></link>

<link type="text/css" rel="stylesheet"
	href="/sunproperty-war/pc/core/themes/default/easyui.css"></link>
<link href="/sunproperty-war/pc/list/css/suncarousel.css" rel="stylesheet" type="text/css"> 
<script src="/sunproperty-war/pc/core/js/jquery-1.9.1.min.js"></script>
<script src="/sunproperty-war/pc/core/js/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="http://api.map.baidu.com/api?v=2.0&ak=vTB7aeSKPFSsBYG77S36fj2CushfN2q9"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction_min.js"></script>
<script src="/sunproperty-war/pc/list/js/suncarousel.js"></script>
<script src="/sunproperty-war/pc/core/js/ajax.js"></script>
<script src="/sunproperty-war/pc/map/js/header.js"></script>
<script src="/sunproperty-war/pc/map/js/oneMarker.js"></script>
<script src="/sunproperty-war/pc/map/js/power.js"></script>
<script src="/sunproperty-war/pc/map/js/bigMarker.js"></script>
<script src="/sunproperty-war/pc/map/js/smallMarker.js"></script>
<script src="/sunproperty-war/pc/map/js/Legend.js"></script>
<script src="/sunproperty-war/pc/map/js/jump.js"></script>
<script src="/sunproperty-war/pc/map/js/bar.js"></script>
<script src="/sunproperty-war/pc/map/js/list.js"></script>
<script src="/sunproperty-war/pc/map/js/countSession.js"></script>
<script src="/sunproperty-war/pc/map/js/map.js"></script>
<script src="/sunproperty-war/pc/map/js/mappan.js"></script>
<script src="/sunproperty-war/pc/core/js/jquery.placeholder.min.js"></script>
<script src="/sunproperty-war/pc/core/js/respond.min.js"></script>
<script src="/sunproperty-war/pc/core/js/html5shiv.min.js"></script>
<!--[if IE 8]>
 <script src="/sunproperty-war/pc/core/js/jquery.backgroundcover.min.js"></script>
<![endif]-->
<!-- <script src="/sunproperty-war/pc/core/js/history.min.js"></script> -->

<script>
	var page = ${requestScope.page.rows};
	var countSession= ${requestScope.countSession};
</script>
</head>
<body>
	<div class="container-fluid">
		<div class="header">
			<jsp:include page="modules/header.jsp" />
		</div>
		<div class="body">
			<div class="mappan">
				<div class="barpan">
					<jsp:include page="modules/bar.jsp" />
				</div>
				<div id="mapdiv" class="mapdiv"></div>
			</div>
			<div class="listpan">
				<jsp:include page="modules/list.jsp" />
			</div>
		</div>
	</div>	
</body>
</html>