package com.beeboxes.util;

import io.appium.java_client.android.AndroidDriver;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;

/**
 * Description: 微信应用基础用例
 * @author dengbin
 * @date 2018年12月1日
 * @time 下午3:03:51
 */
public class TestBaseWeChat {
	public AndroidDriver<?> driver;
	
	public AndroidDriver<?> getDriver() {
		return driver;
	}

	@BeforeClass
	public void beforeClass() {
		driver = new InitializeAppiumWeChat().initializeAppium(driver);
		Wait.sleep(2000);
	}

	@AfterClass
	public void afterClass() {
		driver.quit();
	}

}
