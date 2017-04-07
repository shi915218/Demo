<%@ page contentType="text/html; charset=utf-8" language="java"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page import="java.sql.*,java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="renderer" content="webkit|ie-standcomp|ie-comp">
<meta http-equiv = "X-UA-Compatible" content = "IE=edge,chrome=1" />
<title>拱墅区阳光房产信息公开</title>
<script src="/sunproperty-war/pc/core/js/jquery-1.9.1.min.js"></script>
<script src="/sunproperty-war/pc/core/js/jquery.easyui.min.js"></script>
<script src="/sunproperty-war/pc/list/js/suncarousel.js"></script>
<!-- <script src="../pc/core/js/jquery.skippr.js"></script> -->
<script src="/sunproperty-war/pc/list/js/list.js"></script>
<script src="/sunproperty-war/pc/list/js/scroll.js"></script>


<link type="text/css" rel="stylesheet" href="/sunproperty-war/pc/core/css/header1.css"></link>
<link type="text/css" rel="stylesheet"	href="/sunproperty-war/pc/core/css/core.css"></link>

<link href="/sunproperty-war/pc/list/css/suncarousel.css" rel="stylesheet" type="text/css"> 
<!-- <link href="../pc/map/css/mappan.css" rel="stylesheet" type="text/css"> --> 
<link href="/sunproperty-war/pc/list/css/list.css" rel="stylesheet" type="text/css"> 
<!-- <link href="../pc/detail/css/jquery.skippr.css" rel="stylesheet" type="text/css"> -->

<script src="/sunproperty-war/pc/core/js/jquery.placeholder.min.js"></script>
<script src="/sunproperty-war/pc/core/js/respond.min.js"></script>
<script src="/sunproperty-war/pc/core/js/html5shiv.min.js"></script>
<!--[if IE 8]>
 <script src="/sunproperty-war/pc/core/js/jquery.backgroundcover.min.js"></script>
<![endif]-->

</head>
<body>
	<div class="container">
		<div class="header">
			<jsp:include page="modules/header.jsp" />
		</div>
		
	</div>
	<!-- <div class="mainback"></div>  -->
	<div class="" style="    background: #e8edf2;">			
             <jsp:include page="modules/list.jsp" />
		</div>
</body>
</html>