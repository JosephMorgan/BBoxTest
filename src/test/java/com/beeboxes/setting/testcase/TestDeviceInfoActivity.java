package com.beeboxes.setting.testcase;

import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.Test;

import com.beeboxes.setting.page.PageDeviceInfoActivity;
import com.beeboxes.setting.page.PageSettingsActivity;
import com.beeboxes.util.CommandExecutor;
import com.beeboxes.util.OperateConfig;
import com.beeboxes.util.ReadXml;
import com.beeboxes.util.TestBaseSetting;
import com.beeboxes.util.Wait;

/**
 * Description: 关于设备--用例
 * @author dengbin
 * @date 2018年11月11日
 * @time 下午5:49:08
 */
public class TestDeviceInfoActivity extends TestBaseSetting {

	@Test(description="修改设备名称",invocationCount = 1, threadPoolSize = 1)
	public void testDeviceName() {
		CommandExecutor.executeCommand("adb shell ime set io.appium.android.ime/.UnicodeIME");
		String deviceName = new OperateConfig().getProp("设备名称");
		Reporter.log("步骤1：点关于设备");
		new PageSettingsActivity(driver).clickAboutDevice();
		Assert.assertTrue(driver.findElementById(ReadXml.getElementById("关于设备", "设备名称标签")).isDisplayed());
		Reporter.log("步骤2：改设备名称");
		new PageDeviceInfoActivity(driver).inputDeviceName(new OperateConfig().getProp("设备名称"));
		Assert.assertEquals(driver.findElementById(ReadXml.getElementById("关于设备", "设备名称文本框")).getText(), deviceName);
		new PageDeviceInfoActivity(driver).clickDeviceBack();
	}
	
	@Test(description="导入license",invocationCount = 50000, threadPoolSize = 1)
	public void testImportLicense() {
		String personUpperValue = new OperateConfig().getProp("人数上限的值");
		PageDeviceInfoActivity pageDeviceInfoActivity = new PageDeviceInfoActivity(driver);
		String licenseDir = new OperateConfig().getProp("license所在的文件夹");
		String licenseFile = new OperateConfig().getProp("license文件名");
		Reporter.log("步骤1：点关于设备");		
		new PageSettingsActivity(driver).clickAboutDevice();
		Assert.assertTrue(driver.findElementById(ReadXml.getElementById("关于设备", "设备名称标签")).isDisplayed());
		Reporter.log("步骤2：点3下人数上限");
		for (int i = 0; i < 3; i++) {
			pageDeviceInfoActivity.clickPersonUpper();
		}
		Reporter.log("步骤3：点导入license的按钮");
		pageDeviceInfoActivity.clickImportLicenseBtn();
		Reporter.log("步骤4：选择license");
		pageDeviceInfoActivity.clickLicenseDir(licenseDir);
		Wait.sleep(2000);
		pageDeviceInfoActivity.clickLicenseFile(licenseFile);
		Reporter.log("步骤5：选择完license后点导入");
		pageDeviceInfoActivity.clickImportBtn();
		Reporter.log("步骤6：返回到关于设备");
		driver.pressKey(new KeyEvent(AndroidKey.BACK));
		Wait.sleep(2000);
		driver.pressKey(new KeyEvent(AndroidKey.BACK));
		Assert.assertEquals(driver.findElementById(ReadXml.getElementById("关于设备", "人数上限的数值")).getText(), personUpperValue);
		driver.pressKey(new KeyEvent(AndroidKey.BACK));
		
	}
}
