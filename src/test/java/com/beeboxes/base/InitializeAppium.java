package com.beeboxes.base;


import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.android.AndroidDriver;

/**
 * Description: Appium的初始化
 * @author dengbin
 * @date 2018年6月13日
 */

public class InitializeAppium { 	
	String deviceName = "h03v57c2k";//设备名名称	
	String platformVersion = "7.0";//设备的安卓版本号
	
	String appName = "DataTool";//被测的应用的名称（人员管理应用）
	String appPackage = "com.opnext.datatool";//被测的应用的包名
	String appActivity = "com.opnext.datatool.view.activity.MainActivity";//被测的应用首次打开的页面
	
//	String appName = "Settings";//被测的应用的名称(设置应用)
//	String appPackage = "com.opnext.setting";//被测的应用的包名
//	String appActivity = "com.opnext.setting.SettingsActivity";//被测的应用首次打开的页面
	
//	String appName = "BboxSetupWizard";//被测的应用的名称（激活应用）
//	String appPackage = "com.bbox.bboxsetupwizard";//被测的应用的包名
//	String appActivity = "com.bbox.bboxsetupwizard.ui.activity.ChoiceLanguageActivity";//被测的应用首次打开的页面
	
	public AndroidDriver<?> initializeAppium(AndroidDriver<?> driver) {
		DesiredCapabilities capabilities = new DesiredCapabilities();	
        capabilities.setCapability("unicodeKeyboard",true);//支持中文输入
        capabilities.setCapability("resetKeyboard",true);//重置输入法到原有状态
        
		capabilities.setCapability("deviceName", deviceName);
		capabilities.setCapability("platformVersion", platformVersion);
		
        //capabilities.setCapability("browserName", appName);    
        capabilities.setCapability("appPackage", appPackage);
        capabilities.setCapability("appActivity", appActivity);
		
		capabilities.setCapability("noSign", true);//避免重新签名
		capabilities.setCapability("noReset", true);//设置不用每次都安装被测app
		
        //服务端地址
		try {
			driver = new AndroidDriver<>(new URL("http://127.0.0.1:4723/wd/hub"),capabilities);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);//全局最长等10秒
		return driver;
	}
}



