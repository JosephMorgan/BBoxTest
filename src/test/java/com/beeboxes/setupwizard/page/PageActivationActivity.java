package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

import com.beeboxes.util.PageBase;

/**
 * Description: BboxSetupWizard应用-激活设备页面-元素和方法
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageActivationActivity extends PageBase {
	
	public PageActivationActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/ev_activation_code")
	AndroidElement et_activation_code;//"输入激活码"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_activation")
	AndroidElement tv_activation;//"激活设备"按钮
		
	/**激活时-输入激活码*/
	public void inputActivationCode(String activationCode) {
		et_activation_code.sendKeys(activationCode);
	}
	
	public void clickActivation() {
		tv_activation.click();
	}
}
