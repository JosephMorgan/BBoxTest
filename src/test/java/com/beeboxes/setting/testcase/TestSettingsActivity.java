package com.beeboxes.setting.testcase;

import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.Test;

import com.beeboxes.setting.page.PageSettingsActivity;
import com.beeboxes.util.ReadXml;
import com.beeboxes.util.SwipeScreen;
import com.beeboxes.util.TestBaseSetting;
import com.beeboxes.util.Wait;

/**
 * Description: Setting应用的基础设置列表的用例
 * @author dengbin
 * @date 2018年10月26日
 */
public class TestSettingsActivity extends TestBaseSetting {

	@Test(description="点高级按钮")
	public void testAdvanced() {
		Reporter.log("步骤1：点高级按钮");		
		new PageSettingsActivity(driver).clickAdvanced();
		Assert.assertEquals(driver.findElementById(ReadXml.getElementById("高级设置", "基础")).getText(),"基础");//有“基础”标题
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));
	}
	
	@Test(description="点关于设备",invocationCount=1,threadPoolSize=1)
	public void testAboutDevice() {
		Reporter.log("步骤1：点关于设备");
		new PageSettingsActivity(driver).clickAboutDevice();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/actionbar_title").isDisplayed());//有“设备信息”标题
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));
	}
	
	@Test(description="点使用容量")
	public void testStorageUsage() {
		Reporter.log("步骤1：点使用容量");
		new PageSettingsActivity(driver).clickStorageUsage();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/tv_admin").isDisplayed());//有“管理员”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));
	}
	
	@Test(description="点今日统计")
	public void testTodayStatistics() {
		Reporter.log("步骤1：点今日统计");
		new PageSettingsActivity(driver).clickTodayStatistics();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/succes_num").isDisplayed());//有“识别成功的百分比”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}

	@Test(description="点通用设置")
	public void testCommonSetting() {
		Reporter.log("步骤1：点通用设置");
		new PageSettingsActivity(driver).clickCommonSetting();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/tv_language").isDisplayed());//有“系统语言”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));	
	}
	
	@Test(description="点人脸识别设置")
	public void testFaceRecognizeSetting() {
		Reporter.log("步骤1：点人脸识别设置");
		new PageSettingsActivity(driver).clickFaceRecognizeSetting();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/ll_Validation_mode").isDisplayed());//有“验证模式”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="点更多比对方式设置")
	public void testMoreComparison() {
		Reporter.log("步骤1：点更多比对方式设置");
		new PageSettingsActivity(driver).clickMoreComparison();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/ll_repeat_check").isDisplayed());//有“二次核验”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}

	@Test(description="点人员规则")
	public void testPersonRules() {
		Reporter.log("步骤1：点人员规则");
		new PageSettingsActivity(driver).clickPersonRules();
		Assert.assertTrue(driver.findElementByName("人员规则").isDisplayed());//有“人员规则”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="点设备规则")
	public void testDeviceRules() {
		Wait.sleep(4000);
		SwipeScreen.swipeScreen(driver, "up",235);//向上滑动屏幕235
		Wait.sleep(4000);
		Reporter.log("步骤1：点设备规则");
		new PageSettingsActivity(driver).clickDeviceRules();
		Assert.assertTrue(driver.findElementByName("设备规则").isDisplayed());//有“设备规则”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}

	@Test(description="点网络设置")
	public void testNetworkSetting() {
		Reporter.log("步骤1：点网络设置");
		new PageSettingsActivity(driver).clickNetworkSetting();
		Assert.assertTrue(driver.findElementByName("有线网络").isDisplayed());//有“有线网络”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="点蓝牙设置")
	public void testBlutoothSetting() {
		Reporter.log("步骤1：点蓝牙设置");
		new PageSettingsActivity(driver).clickBlutoothSetting();
		Assert.assertTrue(driver.findElementById("com.android.settings:id/switch_widget").isDisplayed());//有“蓝牙开关”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}

	@Test(description="点时间设置")
	public void testTimeSetting() {
		Reporter.log("步骤1：点时间设置");
		new PageSettingsActivity(driver).clickTimeSetting();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/tv_datestate").isDisplayed());//有“设置日期”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="点重启")
	public void testRebootDevice() {
		Reporter.log("步骤1：点重启");
		new PageSettingsActivity(driver).clickRebootDevice();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/dialog_hint").isDisplayed());//有“重启”的提示语
		Reporter.log("步骤2：点取消");
		driver.findElementById("com.opnext.setting:id/btn_no_reset").click();	
	}

	@Test(description="点恢复出厂设置")
	public void testRestoreFactorySettings() {
		Reporter.log("步骤1：点恢复出厂设置");
		new PageSettingsActivity(driver).clickRestoreFactorySettings();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/dialog_hint").isDisplayed());//有“恢复出厂”的提示语
		Reporter.log("步骤2：点取消");
		driver.findElementById("com.opnext.setting:id/btn_no_reset").click();		
	}
	
	@Test(description="点还原全部设置")
	public void testResetSettings() {
		Wait.sleep(4000);
		SwipeScreen.swipeScreen(driver, "up",290);//向上滑动屏幕290
		Wait.sleep(4000);
		Reporter.log("步骤1：点还原全部设置");
		new PageSettingsActivity(driver).clickResetSettings();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/dialog_hint").isDisplayed());//有“还原全部设置”的提示语
		Reporter.log("步骤2：点取消");
		driver.findElementById("com.opnext.setting:id/btn_no_reset").click();	
	}

	@Test(description="点设置文件导出")
	public void testExportFile() {
		Reporter.log("步骤1：点设置文件导出");
		new PageSettingsActivity(driver).clickExportFile();
		Assert.assertTrue(driver.findElementByName("设置文件导出").isDisplayed());//有“导出终端设置到U盘”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));	
	}
	
	@Test(description="点开门")
	public void testOpenDoor() {
		Reporter.log("步骤1：点开门");
		new PageSettingsActivity(driver).clickOpenDoor();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/dialog_hint").isDisplayed());//有“开门”的提示语
		Reporter.log("步骤2：点取消");
		driver.findElementById("com.opnext.setting:id/btn_no_reset").click();			
	}

	@Test(description="点常开")
	public void testAlwaysOpenDoor() {
		Reporter.log("步骤1：点常开");
		Assert.assertEquals(driver.findElementById("com.opnext.setting:id/switch_always_open_door").getAttribute("checked"),"false");//“常开”开关是关着的
		new PageSettingsActivity(driver).clickAlwaysOpenDoor();
		Assert.assertEquals(driver.findElementById("com.opnext.setting:id/switch_always_open_door").getAttribute("checked"),"true");//“常开”开关是开着的
		Reporter.log("步骤2：关常开");
		new PageSettingsActivity(driver).clickAlwaysOpenDoor();
		Assert.assertEquals(driver.findElementById("com.opnext.setting:id/switch_always_open_door").getAttribute("checked"),"false");
	}
	
	@Test(description="点系统升级")
	public void testSystemUpdate() {
		Reporter.log("步骤1：点系统升级");
		new PageSettingsActivity(driver).clickSystemUpdate();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/rl_current_version").isDisplayed());//网络版，有“当前版本”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="点设备管理员",invocationCount=1,threadPoolSize=1)
	public void testDeviceManager() {
		Reporter.log("步骤1：点设备管理员");
		new PageSettingsActivity(driver).clickDeviceManager();
		Wait.sleep(2000);
		Assert.assertTrue(driver.findElementByName("姓名").isDisplayed());//有“姓名”标签
		Reporter.log("步骤2：返回基础设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
}
