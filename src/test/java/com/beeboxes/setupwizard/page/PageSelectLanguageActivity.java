package com.beeboxes.setupwizard.page;

import org.openqa.selenium.support.PageFactory;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

/**
 * Description: BboxSetupWizard应用-选择语言页面-的元素
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageSelectLanguageActivity {
	public AndroidDriver<?> driver;
	
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/chinese")
	AndroidElement rb_chinese;//"中文"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/english")
	AndroidElement rb_english;//"English"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save_lau")
	AndroidElement tv_next_step;//"下一步"
	
	
	public PageSelectLanguageActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	public void clickChinese() {
		rb_chinese.click();
	}
	
	public void clickNextStep() {
		tv_next_step.click();
	}
}
