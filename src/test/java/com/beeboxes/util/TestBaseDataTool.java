package com.beeboxes.util;

import io.appium.java_client.android.AndroidDriver;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

/**
 * Description: 人员管理应用基础用例
 * @author dengbin
 * @date 2018年12月1日
 * @time 下午3:03:51
 */
public class TestBaseDataTool {
	public AndroidDriver<?> driver;
	
	public AndroidDriver<?> getDriver() {
		return driver;
	}

	@BeforeClass
	public void beforeClass() {
		driver = new InitializeAppiumDataTool().initializeAppium(driver);
		Wait.sleep(5000);
	}

	@AfterClass
	public void afterClass() {
		driver.quit();
	}

}
