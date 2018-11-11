package com.beeboxes.setupwizard.page;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

import org.openqa.selenium.support.PageFactory;

/**
 * Description: BboxSetupWizard应用-激活设备页面-的元素
 * @author dengbin
 * @date 2018年11月03日
 */
public class PageActivationActivity {
    public AndroidDriver<?> driver;
	
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/ev_activation_code")
	AndroidElement et_activation_code;//"输入激活码"
	@AndroidFindBy(id="com.bbox.bboxsetupwizard:id/tv_activation")
	AndroidElement tv_activation;//"激活设备"按钮
	
	public PageActivationActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	public void inputActivationCode() {
		et_activation_code.sendKeys("YbNPj32Wrssm");
	}
	
	public void clickActivation() {
		tv_activation.click();
	}
}
