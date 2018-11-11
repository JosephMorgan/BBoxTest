package com.beeboxes.setting.page;

import org.openqa.selenium.support.PageFactory;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

/**
 * Description: Setting应用的高级设置列表的元素
 * @author dengbin
 * @date 2018年7月5日
 */

public class PageAdvancedSettingActivity {
	public AndroidDriver<?> driver;
	
	@AndroidFindBy(id="com.opnext.setting:id/Universal_settings")
	AndroidElement ll_camera_effect_setting;//"摄像头效果设置"
	@AndroidFindBy(id="com.opnext.setting:id/recognition_record")
	AndroidElement ll_recognition_record_setting;//"识别记录设置"
	@AndroidFindBy(id="com.opnext.setting:id/custom_prompt")
	AndroidElement ll_tips_custom_setting;//"提示信息自定义设置"
	@AndroidFindBy(id="com.opnext.setting:id/control_signal")
	AndroidElement ll_guard_signal;//"门禁信号设置"
	@AndroidFindBy(id="com.opnext.setting:id/standby_setting")
	AndroidElement ll_standby_setting;//"待机页面设置"
	@AndroidFindBy(id="com.opnext.setting:id/blacklist")
	AndroidElement ll_blacklist_setting;//"黑名单设置"
	
	public PageAdvancedSettingActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}
	
	public void clickCameraEffectSetting() {
		ll_camera_effect_setting.click();
	}
	
	public void clickRecognitionRecordSetting() {
		ll_recognition_record_setting.click();
	}
	
	public void clickTipsCustomSetting() {
		ll_tips_custom_setting.click();
	}
	
	public void clickStandbySetting() {
		ll_standby_setting.click();
	}

}



