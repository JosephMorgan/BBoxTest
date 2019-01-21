package com.beeboxes.setupwizard.page;

import com.beeboxes.util.PageBase;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * Description: BboxSetupWizard应用-时间设置页面-元素和方法
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageTimeSettingActivity extends PageBase {
	
	public PageTimeSettingActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/btn_auto")
	AndroidElement tb_automatic_setting;//"自动设置"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_next_step;//"下一步"
	
	public void clickNextStep() {
		tv_next_step.click();
	}

}
