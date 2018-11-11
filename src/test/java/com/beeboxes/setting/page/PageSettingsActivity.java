package com.beeboxes.setting.page;

import org.openqa.selenium.Keys;
import org.openqa.selenium.support.PageFactory;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

/**
 * Description: Setting应用的基础设置列表的元素
 * @author dengbin
 * @date 2018年6月28日
 */
public class PageSettingsActivity {
	public AndroidDriver<?> driver;
	
	@AndroidFindBy(id="com.opnext.setting:id/actionbar_advanced")
	AndroidElement tv_advanced;//"高级"
	@AndroidFindBy(id="com.opnext.setting:id/tv_about_device")
	AndroidElement tv_about_device;//"关于设备"
	@AndroidFindBy(id="com.opnext.setting:id/tv_memory_usage")
	AndroidElement tv_storage_usage;//"使用容量"
	@AndroidFindBy(id="com.opnext.setting:id/tv_statistics_today")
	AndroidElement tv_today_statistics;//"今日统计"
	@AndroidFindBy(id="com.opnext.setting:id/tv_common_setting")
	AndroidElement tv_common_setting;//"通用设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_face_recognize_setting")
	AndroidElement tv_face_recognize_setting;//"人脸识别设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_more_comparison")
	AndroidElement tv_more_comparison;//"更多比对方式设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_person_rules")
	AndroidElement tv_person_rules;//"人员规则"
	@AndroidFindBy(id="com.opnext.setting:id/tv_device_rules")
	AndroidElement tv_device_rules;//"设备规则"
	@AndroidFindBy(id="com.opnext.setting:id/tv_network_setting")
	AndroidElement tv_network_setting;//"网络设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_blutooth_setting")
	AndroidElement tv_blutooth_setting;//"蓝牙设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_time_setting")
	AndroidElement tv_time_setting;//"时间设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_reboot_setting")
	AndroidElement tv_reboot_device;//"重启"
	@AndroidFindBy(id="com.opnext.setting:id/tv_factoryMode_reset")
	AndroidElement tv_restore_factory_settings;//"恢复出厂设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_reset_settings")
	AndroidElement tv_reset_settings;//"还原全部设置"
	@AndroidFindBy(id="com.opnext.setting:id/tv_export_file")
	AndroidElement tv_export_file;//"设置文件导出"
	@AndroidFindBy(id="com.opnext.setting:id/tv_open_door")
	AndroidElement tv_open_door;//"开门"
	@AndroidFindBy(id="com.opnext.setting:id/switch_always_open_door")
	AndroidElement tv_always_open_door;//"常开"
	@AndroidFindBy(id="com.opnext.setting:id/tv_system_update")
	AndroidElement tv_system_update;//"系统升级"
	@AndroidFindBy(id="com.opnext.setting:id/tv_device_manager")
	AndroidElement tv_device_manager;//"设备管理员"
		
	public PageSettingsActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	public void clickAdvanced() {
		tv_advanced.sendKeys(Keys.TAB);
	}
	
	public void clickAboutDevice() {
		tv_about_device.click();
	}
	
	public void clickStorageUsage() {
		tv_storage_usage.click();
	}
	
	public void clickTodayStatistics() {
		tv_today_statistics.click();
	}
	
	public void clickCommonSetting() {
		tv_common_setting.click();
	}
	
	public void clickFaceRecognizeSetting() {
		tv_face_recognize_setting.click();
	}
	
	public void clickMoreComparison() {
		tv_more_comparison.click();
	}
	
	public void clickPersonRules() {
		tv_person_rules.click();
	}
	
	public void clickDeviceRules() {
		tv_device_rules.click();
	}
	
	public void clickNetworkSetting() {
		tv_network_setting.click();
	}
	
	public void clickBlutoothSetting() {
		tv_blutooth_setting.click();
	}
	
	public void clickTimeSetting() {
		tv_time_setting.click();
	}
	
	public void clickRebootDevice() {
		tv_reboot_device.click();
	}
	
	public void clickRestoreFactorySettings() {
		tv_restore_factory_settings.click();
	}
	
	public void clickResetSettings() {
		tv_reset_settings.click();
	}
	
	public void clickExportFile() {
		tv_export_file.click();
	}
	
	public void clickOpenDoor() {
		tv_open_door.click();
	}
	
	public void clickAlwaysOpenDoor() {
		tv_always_open_door.click();
	}
	
	public void clickSystemUpdate() {
		tv_system_update.click();
	}
	
	public void clickDeviceManager() {
		tv_device_manager.click();
	}

}



