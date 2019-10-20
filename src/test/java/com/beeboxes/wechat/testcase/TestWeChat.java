package com.beeboxes.wechat.testcase;

import org.testng.Reporter;
import org.testng.annotations.Test;

import com.beeboxes.util.TestBaseWeChat;
import com.beeboxes.util.Wait;
import com.beeboxes.util.WindowSwitch;
import com.beeboxes.wechat.page.PageWeChatMainActivity;

/**
 * Description: 微信应用-蜂盒科技公众号的用例
 * @author dengbin
 * @date 2018年11月03日
 */
public class TestWeChat extends TestBaseWeChat {
	
	@Test(description="进入微信访客",threadPoolSize=1,invocationCount=1)
	public void testBBoxWechat() {
		Reporter.log("步骤1：在微信页点蜂盒科技开放平台测试1");
		new PageWeChatMainActivity(driver).openBeeboxesWechatTest1();
		Reporter.log("步骤2：在蜂盒科技开放平台测试1点测试环境");
		new PageWeChatMainActivity(driver).openTestEnv();
		Reporter.log("步骤3：在测试环境点16服务器的微信访客的入口");
		new PageWeChatMainActivity(driver).openWeChatVistor();
		Wait.sleep(5000);
		}
	
	@Test(description="进入南京大牌档",threadPoolSize=1,invocationCount=1)
	public void testNanjingFoodStalls() {
		Reporter.log("步骤1：在微信页点南京大牌档");
		new PageWeChatMainActivity(driver).openNanjingFoodStalls();
		Reporter.log("步骤2：在南京大牌档点用餐服务");
		new PageWeChatMainActivity(driver).openDiningService();
		Reporter.log("步骤3：在用餐服务用点餐取号");
		new PageWeChatMainActivity(driver).openOrderTakeaNumber();
		Wait.sleep(3000);
		Reporter.log("步骤4：点击点菜");
		WindowSwitch.switchtoWindow(driver, "wx56bfae4c7dd61091:pages/index.html");
		new PageWeChatMainActivity(driver).clickOrder();
		Wait.sleep(3000);
		Reporter.log("步骤5：选第二家店");
		WindowSwitch.switchtoWindow(driver, "wx56bfae4c7dd61091:pages/dishes.html");
		new PageWeChatMainActivity(driver).clickSecondStore();
		
		}
	
	

}
