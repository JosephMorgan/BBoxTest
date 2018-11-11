package com.beeboxes.setupwizard.testcase;

import io.appium.java_client.android.AndroidDriver;
//import io.appium.java_client.android.nativekey.AndroidKey;
//import io.appium.java_client.android.nativekey.KeyEvent;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.beeboxes.base.InitializeAppium;
import com.beeboxes.setupwizard.page.PageActivationActivity;
import com.beeboxes.setupwizard.page.PageNetworkSettingActivity;
import com.beeboxes.setupwizard.page.PageSelectLanguageActivity;
import com.beeboxes.setupwizard.page.PageSelectModelActivity;
import com.beeboxes.setupwizard.page.PageServerAddressSetActivity;
import com.beeboxes.setupwizard.page.PageTimeSettingActivity;

/**
 * Description: BboxSetupWizard应用的激活流程的用例
 * @author dengbin
 * @date 2018年11月03日
 */
public class TestSetupwizard {
	public AndroidDriver<?> driver;

	@BeforeClass
	public void beforeClass() {
		driver = new InitializeAppium().initializeAppium(driver);
	}

	@AfterClass
	public void afterClass() {
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();
	}
	
	@Test(description="网络版默认的激活流程")
	public void testNetworkDefaultSetupwizard() {
		Reporter.log("步骤1：点选择语言的下一步");
		new PageSelectLanguageActivity(driver).clickNextStep();	
		Assert.assertTrue(driver.findElementByName("时间设置").isDisplayed());//跳到“时间设置”页面
		Reporter.log("步骤2：点时间设置的下一步");
		new PageTimeSettingActivity(driver).clickNextStep();	
		Assert.assertTrue(driver.findElementByName("选择工作模式").isDisplayed());//跳到“选择工作模式”页面
		Reporter.log("步骤3：点选择工作模式的下一步");
		new PageSelectModelActivity(driver).clickNextStep();	
		Assert.assertTrue(driver.findElementByName("网络设置").isDisplayed());//跳到“网络设置”页面
		Reporter.log("步骤4：点网络设置的有线网络");
		new PageNetworkSettingActivity(driver).clickWire();
		Assert.assertTrue(driver.findElementByName("网关").isDisplayed());//跳到“有线网络设置”页面
		Reporter.log("步骤5：点有线网络的保存");
		new PageNetworkSettingActivity(driver).clickWireSave();
		Assert.assertTrue(driver.findElementByName("WLAN").isDisplayed());//又跳回“网络设置”页面
		Reporter.log("步骤6：点网络设置的下一步");
		new PageNetworkSettingActivity(driver).clickWireSave();
		Assert.assertTrue(driver.findElementByName("服务器地址设置").isDisplayed());//跳到“服务器地址设置”页面
		Reporter.log("步骤7：输入服务器地址");
		new PageServerAddressSetActivity(driver).inputServerAddress();
		Reporter.log("步骤8：点服务器地址设置的下一步");
		new PageServerAddressSetActivity(driver).clickNextStep();
		Assert.assertTrue(driver.findElementByName("激活设备").isDisplayed());//跳到“激活设备”页面
		Reporter.log("步骤9：输入激活码");
		new PageActivationActivity(driver).inputActivationCode();
		Reporter.log("步骤10：点激活设备的按钮");
		new PageActivationActivity(driver).clickActivation();
		Assert.assertTrue(driver.findElementByName("开始使用").isDisplayed());//跳到“激活设备”页面
		//driver.pressKey(new KeyEvent(AndroidKey.BACK));//返回键
	}
	
	@Test(description="单机版默认的激活流程")
	public void testStandAloneDefaultSetupwizard() {
		Reporter.log("步骤1：点选择语言的下一步");
		new PageSelectLanguageActivity(driver).clickNextStep();	
		Assert.assertTrue(driver.findElementByName("时间设置").isDisplayed());//跳到“时间设置”页面
		Reporter.log("步骤2：点时间设置的下一步");
		new PageTimeSettingActivity(driver).clickNextStep();	
		Assert.assertTrue(driver.findElementByName("选择工作模式").isDisplayed());//跳到“选择工作模式”页面
		Reporter.log("步骤3：在工作模式页面选单机模式");
		new PageSelectModelActivity(driver).clickStandAloneMode();
		Reporter.log("步骤4：点工作模式的下一步");
		new PageSelectModelActivity(driver).clickNextStep();
		Assert.assertTrue(driver.findElementByName("欢迎使用").isDisplayed());//跳到“欢迎使用”页面
//		Reporter.log("步骤5：点欢迎使用页面的开始使用");
//		new PageWelcomeActivity(driver).clickStartUse();

		
	}

}
