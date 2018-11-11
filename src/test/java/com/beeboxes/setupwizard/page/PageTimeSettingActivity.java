package com.beeboxes.setupwizard.page;

import org.openqa.selenium.support.PageFactory;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

/**
 * Description: BboxSetupWizard应用-时间设置页面-的元素
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageTimeSettingActivity {
	public AndroidDriver<?> driver;
	
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/btn_auto")
	AndroidElement tb_automatic_setting;//"自动设置"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_next_step;//"下一步"
	
	
	public PageTimeSettingActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	public void clickNextStep() {
		tv_next_step.click();
	}

}
