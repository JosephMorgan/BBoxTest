package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

import com.beeboxes.util.PageBase;

/**
 * Description: BboxSetupWizard应用-选择工作模式页面-元素和方法
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageSelectModelActivity extends PageBase {
	
	public PageSelectModelActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/saas_mode")
	AndroidElement rb_saas_mode;//"云服务模式"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/standalone_mode")
	AndroidElement rb_standalone_mode;//"单主机模式"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_next_step;//"下一步"
	
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
