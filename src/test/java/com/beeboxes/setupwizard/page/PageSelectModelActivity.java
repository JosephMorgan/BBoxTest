package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

import org.openqa.selenium.support.PageFactory;

/**
 * Description: BboxSetupWizard应用-选择工作模式页面-的元素
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageSelectModelActivity {
	public AndroidDriver<?> driver;
	
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/saas_mode")
	AndroidElement rb_saas_mode;//"云服务模式"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/standalone_mode")
	AndroidElement rb_standalone_mode;//"单主机模式"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_next_step;//"下一步"
	
	
	public PageSelectModelActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	public void clickSaaSMode() {
		rb_saas_mode.click();
	}
	
	public void clickStandAloneMode() {
		rb_standalone_mode.click();
	}
	
	public void clickNextStep() {
		tv_next_step.click();
	}

}
