package com.hoolai.wristband.web;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.map.MultiKeyMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hoolai.enpoint.ResultType;
import com.hoolai.enpoint.param.IllegalParameterException;
import com.hoolai.enpoint.param.ParamsMap;
import com.hoolai.exception.BusinessException;
import com.hoolai.util.JSONUtils;


/**
 * url = ${webroot}/v1/serviceName/methodName
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/v1/*")
public class RestfulServiceController {
	
	private Logger logger = LoggerFactory.getLogger(RestfulServiceController.class);

	/** 所有方法只接受一个参数：Map<String, String> */
	private static final int PARAM_LEN = 1;
	@Autowired
	private ApplicationContext applicationContext;
	
	private MultiKeyMap methodCacheMap = new MultiKeyMap();
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="{serviceName}/{methodName}")
	@ResponseBody
	public Object dispatch(HttpServletRequest request , HttpServletResponse response, 
						   @PathVariable("serviceName") String serviceName,
						   @PathVariable("methodName") String methodName
		){
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("P3P","CP=CAO PSA OUR");
		response.setContentType("text/html; charset=UTF-8");
		
		serviceName = serviceName+"Service";
		
		Object bean = applicationContext.getBean(serviceName);
		
		//缓存方法
		if (!methodCacheMap.containsKey(serviceName, methodName)){
			methodCacheMap.put(serviceName, methodName, findMethod(methodName, bean));
		}
		
		Method currentMethod = (Method) methodCacheMap.get(serviceName, methodName);
		
		Map<String, Object> result = new HashMap<String, Object>();
		//找不到
		if (currentMethod == null){
			result.put("ret", -1);
			result.put("msg", "找不到方法");
			return result;
		}
		
		//转换参数
		ParamsMap paramMap = WebUtil.parseParams(request);

		String token = paramMap.get("token");
		if(null != token){
//			paramMap.put("userId",KeyUtil.getUserIdByToken(token)[0]);
		}else{
			paramMap.put("userId","0");
		}
			
		try {
			Object resultObject = null;
			resultObject = currentMethod.invoke(bean, paramMap);
			
			result = (Map<String, Object>) resultObject;
			if(paramMap.containsKey("_result_type")){
				result.put("_result_type", paramMap.get("_result_type"));
			}
			
			return returnResult(response, result);
			
		} catch (Exception e) {
			return exceptionHandler(e);
		}
		
	}


	/**
	 * 返回结果
	 * @param response
	 * @param result
	 * @return
	 * @throws IOException
	 */
	private Object returnResult(HttpServletResponse response,Map<String, Object> result) throws IOException {
		ResultType resultType = null;
		if(result.containsKey("_result_type")){
			String resultTypeStr = (String) result.get("_result_type");
			resultType = ResultType.valueOf(resultTypeStr);
		} else {
			resultType = ResultType.json;
		}
		switch (resultType) {
		case object: {
			String object = String.valueOf(result.get("object"));
			return object;
		}
		case json: {
			result.remove("_result_type");

			Map<String, Object> ret = new HashMap<String, Object>();
			ret.put("ret", 1);
			ret.put("msg", "success");
			ret.put("data", result);
			
//			result.put("ret", 1);
//			result.put("msg", "success");
//			result.remove("_result_type");
			return ret;
		}
		case redirect: {
			String url = (String) result.get("redirectUrl");
			response.setHeader("P3P","CP=CAO PSA OUR");
			response.sendRedirect(url);
			break;
		}
		case stream:{
			
			Map<String, Object> ret = new HashMap<String, Object>();
			ret.put("ret", 1);
			ret.put("msg", "success");
			ret.put("data", result);
			byte[] content = JSONUtils.toJSON(ret).getBytes();
			
			response.setContentType("application/octet-stream");
			response.setContentLength(content.length);
			
			ServletOutputStream sos = response.getOutputStream();
			sos.write(content);
			sos.close();
			break;
		}
		default:
			// error!
			throw new RuntimeException("not supported resultType:" + resultType.toString());
		}
		return "";
	}
	
	/**
	 * 异常处理
	 * @param e
	 * @return
	 */
	private Object exceptionHandler(Exception e) {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("ret", -1);
		if(e instanceof InvocationTargetException){
			InvocationTargetException invocationTargetException=(InvocationTargetException) e;
			if(invocationTargetException.getTargetException() instanceof BusinessException){
				BusinessException businessException = (BusinessException) invocationTargetException.getTargetException();
				result.put("code", businessException.getErrorCode());
				result.put("msg", businessException.getMessage());
				logger.error(businessException.getMessage());
			}else if (invocationTargetException.getTargetException() instanceof IllegalParameterException){
				IllegalParameterException illegalParameterException = (IllegalParameterException) invocationTargetException.getTargetException();
				result.put("code", -99);
				result.put("msg", "params["+ illegalParameterException.getParamName() 
						+"] is illegal. cause:" + illegalParameterException.getMessage() );
				logger.error(illegalParameterException.getMessage());
			}else{
//				e.printStackTrace();
				logger.error(e.getMessage());
				result.put("msg", "服务器未知错误，请联系管理员！");
			}
		}else if(e instanceof BusinessException){
			logger.error(e.getMessage());
			BusinessException businessException = (BusinessException) e;
			result.put("code", businessException.getErrorCode());
			result.put("msg", businessException.getMessage());
		}else{
			result.put("msg", "unknown exception,cause:"+ e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	
	/**
	 * 
	 * @param methodName
	 * @param bean
	 * @return
	 */
	private Method findMethod(String methodName, Object bean) {
		Method currentMethod = null;
		Method[] methods = bean.getClass().getMethods();
		//FIXME: cache the methods
		for (Method method : methods) {
			if(method.getName().equals(methodName)){
				int methodLength = method.getParameterTypes().length;
				if(methodLength == PARAM_LEN){
					currentMethod = method;
					break;
				}
			}
		}
		return currentMethod;
	}
	
}
