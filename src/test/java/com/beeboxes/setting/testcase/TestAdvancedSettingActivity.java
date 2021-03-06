package com.beeboxes.setting.testcase;

import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.Test;

import com.beeboxes.setting.page.PageAdvancedSettingActivity;
import com.beeboxes.setting.page.PageSettingsActivity;
import com.beeboxes.util.ReadXml;
import com.beeboxes.util.TestBaseSetting;
import com.beeboxes.util.Wait;

/**
 * Description: Setting应用的高级设置列表的用例
 * @author dengbin
 * @date 2018年10月26日
 */
public class TestAdvancedSettingActivity extends TestBaseSetting {

	@Test(description="点高级按钮")
	public void testAdvanced() {
		Reporter.log("步骤1：点高级按钮");
		new PageSettingsActivity(driver).clickAdvanced();
		Wait.sleep(2000);
		Assert.assertTrue(driver.findElementById(ReadXml.getElementById("基础设置", "高级")).isDisplayed());//有“高级设置”标题
	}
	
	@Test(description="摄像效果设置",invocationCount=1,threadPoolSize=1)
	public void testCameraEffectSetting() {
		Reporter.log("步骤1：点摄像效果设置");
		new PageAdvancedSettingActivity(driver).clickCameraEffectSetting();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/tv_led").isDisplayed());//有“补光灯基础亮度”标签
		Reporter.log("步骤2：返回高级设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="识别记录设置",invocationCount=1,threadPoolSize=1)
	public void testRecognitionRecordSetting() {
		Reporter.log("步骤1：点识别记录设置");
		new PageAdvancedSettingActivity(driver).clickRecognitionRecordSetting();
		Assert.assertTrue(driver.findElementByName("测试模式").isDisplayed());//有“测试模式”标签
		Reporter.log("步骤2：返回高级设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="提示信息自定义设置",invocationCount=1,threadPoolSize=1)
	public void testTipsCustomSetting() {
		Reporter.log("步骤1：点提示信息自定义设置");
		new PageAdvancedSettingActivity(driver).clickTipsCustomSetting();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/custom_hint_configure").isDisplayed());//有“自定义提示配置”标签
		Reporter.log("步骤2：返回高级设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));		
	}
	
	@Test(description="待机页面设置",invocationCount=1,threadPoolSize=1)
	public void testStandbySetting() {
		Reporter.log("步骤1：点待机页面设置");
		new PageAdvancedSettingActivity(driver).clickStandbySetting();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/re_image").isDisplayed());//有“待机壁纸”标签
		Reporter.log("步骤2：返回高级设置列表");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));	
	}

}
