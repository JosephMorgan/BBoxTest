package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

import org.openqa.selenium.support.PageFactory;

/**
 * Description: BboxSetupWizard应用-服务器地址设置页面-的元素
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageServerAddressSetActivity {
    public AndroidDriver<?> driver;
	
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/ev_server_address")
	AndroidElement et_server_address;//"服务地址"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_next_step;//"下一步"
	
	public PageServerAddressSetActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	public void inputServerAddress() {
		et_server_address.sendKeys("face.beeboxes.com");
	}
	
	public void clickNextStep() {
		tv_next_step.click();
	}

}
