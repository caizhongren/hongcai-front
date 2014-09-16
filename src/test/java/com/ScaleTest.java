package com;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;






@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"classpath:applicationContext.xml"
//		"classpath:META-INF/spring/distributed_transaction.xml",
//		"classpath:META-INF/spring/sysconfigContext.xml",
//		"classpath:META-INF/spring/messageServiceConsumer.xml"
})
@TransactionConfiguration(transactionManager = "springTransactionManager", defaultRollback = false)
public class ScaleTest {
	

	
//	@Autowired
//	private UserDao userDao;
	
//	@Autowired
//	private BaseCacheClient baseCacheClient;
	
//	@Resource(name = "cacheClient")
//	private JMemcache cache;
	
//	@Autowired
//	private UserCache userCache;
//	
//	@Autowired
//	private UserRedis userRedis;
	
	@Test
	@Rollback(true)
	public void testContract(){
		System.out.println("ddd");
		
//		userCache.x();
		
//		userRedis.e();
//		baseCacheClient.a();
//		System.out.println(appSportDao.getAppSportList());
//		System.out.println("========");
//		User u = userDao.getUserById(1423);
//		System.out.println(userDao.getUserById(420).getEmail());
//		u.setEmail("aaaadddddd@163.com");
//		
//		User user = new User();
//		user.setEmail("iuej1254@126.com");
//		user.setId(1423);
//		System.out.println(userDao.updateUser(u));
//		

//		cache.add("testchenhui", "dddd");
//		Object o =cache.get("testchenhui");
//		System.out.println(o);

	}

}
