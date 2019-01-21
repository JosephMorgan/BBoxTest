package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

import com.beeboxes.util.PageBase;

/**
 * Description: BboxSetupWizard应用-网络设置页面-元素和方法
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageNetworkSettingActivity extends PageBase {
	
	public PageNetworkSettingActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/rel_wlan")
	AndroidElement rl_wlan;//"WLAN"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/rel_wire")
	AndroidElement rl_wire;//"有线网络"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_next_step;//"下一步"
	
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_wire_save;//有线网络的"保存"
	
	public void clickWlan() {
		rl_wlan.click();
	}
	
	public void clickWire() {
		rl_wire.click();
	}
	
	public void clickWireSave() {
		tv_wire_save.click();
	}
	
	public void clickNextStep() {
		tv_next_step.click();
	}

}
