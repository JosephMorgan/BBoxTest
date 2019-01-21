package com.beeboxes.setupwizard.page;

import com.beeboxes.util.PageBase;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * Description: BboxSetupWizard应用-选择语言页面-元素和方法
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageSelectLanguageActivity extends PageBase {
	
	public PageSelectLanguageActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/chinese")
	AndroidElement rb_chinese;//"中文"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/english")
	AndroidElement rb_english;//"English"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save_lau")
	AndroidElement tv_next_step;//"下一步"
	
	public void clickChinese() {
		rb_chinese.click();
	}
	
	public void clickNextStep() {
		tv_next_step.click();
	}
}
