package com.beeboxes.setting.page;

import org.openqa.selenium.By;

import com.beeboxes.util.EditText;
import com.beeboxes.util.PageBase;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * Description: 关于设备--页面元素
 * @author dengbin
 * @date 2018年10月26日
 */
public class PageDeviceInfoActivity extends PageBase  {
	
	public PageDeviceInfoActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	@AndroidFindBy(id="com.opnext.setting:id/actionbar_back")
	AndroidElement iv_device_back;//"设备名称"
	@AndroidFindBy(id="com.opnext.setting:id/et_device_info")
	AndroidElement et_device_name;//"设备名称"
	@AndroidFindBy(id="com.opnext.setting:id/rl_maxmember")
	AndroidElement rl_person_upper;//"人数上限"com.opnext.setting:id/tv_maxmember
	@AndroidFindBy(id="com.opnext.setting:id/tv_maxmember")
	AndroidElement tv_person_upper_value;//"人数上限的数值"
	@AndroidFindBy(id="com.opnext.setting:id/btn_import_license")
	AndroidElement btn_import_license;//"导入license"按钮
	@AndroidFindBy(id="com.opnext.setting:id/library_btn_import")
	AndroidElement btn_import;//"选择完license后的导入按钮"
	
	/** 点关于设备页面的返回 */
	public void clickDeviceBack() {
		iv_device_back.click();	
	}
	
	/** 修改设备名称 */
	public void inputDeviceName(String deviceName) {
		et_device_name.click();
		EditText.clearText(driver, et_device_name.getAttribute("text"));
		et_device_name.sendKeys(deviceName);		
	}
	
	/** 点击人数上限 */
	public void clickPersonUpper() {
		rl_person_upper.click();
	}
	
	/** 点击导入license的按钮 */
	public void clickImportLicenseBtn() {
		btn_import_license.click();
	}
	
	/** 关于设备-选择license所在的文件夹 */
	public void clickLicenseDir(String fileDir ) {
		driver.findElement(By.name(fileDir)).click();
	}
	
	/** 关于设备-选择license文件dat */
	public void clickLicenseFile(String licenseFile) {
		driver.findElement(By.name(licenseFile)).click();
	}
	
	/** 关于设备-选择license文件dat */
	public void clickImportBtn() {
		btn_import.click();
	}
}
