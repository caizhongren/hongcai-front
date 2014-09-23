<%@page import="com.hoolai.framework.util.DateUtil"%>
<%@page import="com.hoolai.p2p.session.SessionAuth"%>
<%@page import="com.hoolai.p2p.util.EmailUtils"%>
<%@page import="com.hoolai.p2p.entity.hcm.User"%>
<%@page import="com.hoolai.p2p.dao.UserDao"%>
<%@page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@page import="org.springframework.context.ApplicationContext"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户激活</title>
</head>
<body>
	<%
		ApplicationContext ac = WebApplicationContextUtils.getRequiredWebApplicationContext(this.getServletContext());
		UserDao userDao = ac.getBean(UserDao.class);
		String token = request.getParameter("token");
		String email = EmailUtils.decodeMail(token);
		User user = userDao.getUserByEmail(email);
		if (user == null)
			out.println("不存在该用户！");
		else if(user.isActive()){
			out.println("您的帐户已经处于激活状态！");
		}else{
			user.setActive(true);
			user.setLastLoginTime(DateUtil.getCurrentTimeSecond());
			userDao.updateUser(user);
			SessionAuth sessionAuth = ac.getBean(SessionAuth.class);
			sessionAuth.addSession(user);
			out.println("您的帐户已经被激活！");
			//response.sendRedirect("active-success.html?activeTag=1");
		}
	%>
</body>
</html>