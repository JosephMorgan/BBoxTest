package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

import com.beeboxes.util.PageBase;

/**
 * Description: BboxSetupWizard应用-欢迎使用页面-元素和方法
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageWelcomeActivity extends PageBase {
	
	public PageWelcomeActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_start_use;//"开始使用"com.bbox.bboxsetupwizard:id/tv_service
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/cb_code")
	AndroidElement chk_agreement_checkbox;//"协议"勾选框
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_service")
	AndroidElement tv_service;//"服务协议"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_private")
	AndroidElement tv_private;//"隐私条款"
	
	public void clickStartUse() {
		tv_start_use.click();
	}
}
