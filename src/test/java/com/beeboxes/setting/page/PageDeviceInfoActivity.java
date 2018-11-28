package com.beeboxes.setting.page;

import org.openqa.selenium.support.PageFactory;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

/**
 * Description: 关于设备--页面元素
 * @author dengbin
 * @date 2018年10月26日
 */
public class PageDeviceInfoActivity {
	public AndroidDriver<?> driver;
	
	public PageDeviceInfoActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	@AndroidFindBy(id="com.opnext.setting:id/et_device_info")
	AndroidElement et_device_name;//"设备名称"
	
	public void inputDeviceName(String deviceName) {
		et_device_name.sendKeys(deviceName);
		}

}
