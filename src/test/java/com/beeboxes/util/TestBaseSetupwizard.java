package com.beeboxes.util;

import io.appium.java_client.android.AndroidDriver;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

/**
 * Description: 设备激活应用基础用例
 * @author dengbin
 * @date 2018年12月1日
 * @time 下午3:03:51
 */
public class TestBaseSetupwizard {
	public AndroidDriver<?> driver;
	
	public AndroidDriver<?> getDriver() {
		return driver;
	}

	@BeforeClass
	public void beforeClass() {
		driver = new InitializeAppiumSetupwizard().initializeAppium(driver);
		Wait.sleep(2000);
	}

	@AfterClass
	public void afterClass() {
		driver.quit();
	}

}
