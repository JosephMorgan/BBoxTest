package com.beeboxes.setting.testcase;

import io.appium.java_client.android.AndroidDriver;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.beeboxes.base.InitializeAppium;
import com.beeboxes.base.OperateConfig;
import com.beeboxes.setting.page.PageDeviceInfoActivity;
import com.beeboxes.setting.page.PageSettingsActivity;

/**
 * Description: 关于设备--用例
 * @author dengbin
 * @date 2018年11月11日
 * @time 下午5:49:08
 */
public class TestDeviceInfoActivity {
	public AndroidDriver<?> driver;

	@BeforeClass
	public void beforeClass() {
		driver = new InitializeAppium().initializeAppium(driver);

	}

	@AfterClass
	public void afterClass() {
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();
	}

	@Test(description="修改设备名称",invocationCount = 2000, threadPoolSize = 1)
	public void testDeviceName() {
		Reporter.log("步骤1：点关于设备");		
		new PageSettingsActivity(driver).clickAboutDevice();
		Assert.assertTrue(driver.findElementById("com.opnext.setting:id/et_device_info").isDisplayed());//有“设备名称”标题
		Reporter.log("步骤2：改设备名称");
		new PageDeviceInfoActivity(driver).inputDeviceName(new OperateConfig().getProp("设备名称"));
		Assert.assertEquals(driver.findElementById("com.opnext.setting:id/et_device_info").getText(), "邓斌的设备");
	}
}
