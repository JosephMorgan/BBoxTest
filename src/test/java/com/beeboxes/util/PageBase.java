package com.beeboxes.util;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

import org.openqa.selenium.support.PageFactory;

/**
 * Description: 基础页面
 * @author dengbin
 * @date 2018年12月1日
 * @time 下午6:49:53
 */
public class PageBase {
	public AndroidDriver<?> driver;
	
	public PageBase(AndroidDriver<?> driver) {
		
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}// 定义构造函数，初始化PageFactory

	public String getPageSource() {
		return driver.getPageSource();
	}
	public void close() {
		this.driver.close();
	}


}
