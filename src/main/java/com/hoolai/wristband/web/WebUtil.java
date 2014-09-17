package com.hoolai.wristband.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.hoolai.enpoint.param.ParamsMap;

/**
 *author  hjintao
 *2013-1-15
 */
public class WebUtil {
	
	public static  ParamsMap parseParams(HttpServletRequest request) {
		@SuppressWarnings("unchecked")
		Map<String, String[]> params = request.getParameterMap();
		if (params.isEmpty()) {
			return new ParamsMap(0);
		}

		ParamsMap resultParams = new ParamsMap(params.size());
		for (String key : params.keySet()) {
			String[] values = params.get(key);
			if(values == null || values.length == 0) {
				continue;
			}
			
			/*if (values.length > 1) {
				//multiple value! use only first one.
				if (logger.isDebugEnabled()) {
					logger.error("RequestURL:"+request.getRequestURL().toString());
					logger.error("warning:multiple values: key=" + key + " value=" + Arrays.asList(values));
				}
			}*/

			resultParams.put(key, values[0]);

		}

		return resultParams;
	}
	
}
