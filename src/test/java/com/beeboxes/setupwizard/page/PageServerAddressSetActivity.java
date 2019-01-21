package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

import com.beeboxes.util.PageBase;

/**
 * Description: BboxSetupWizard应用-服务器地址设置页面-元素和方法
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageServerAddressSetActivity extends PageBase {
	
	public PageServerAddressSetActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/ev_server_address")
	AndroidElement et_server_address;//"服务地址"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_save")
	AndroidElement tv_next_step;//"下一步"
	
	/**激活时-输入服务器的地址*/
	public void inputServerAddress(String serverAddress) {
		et_server_address.sendKeys(serverAddress);
	}
	
	public void clickNextStep() {
		tv_next_step.click();
	}

}
