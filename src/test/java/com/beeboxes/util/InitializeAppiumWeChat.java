package com.beeboxes.util;


import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.android.AndroidDriver;

/**
 * Description: 微信应用的Appium的初始化
 * @author dengbin
 * @date 2018年6月13日
 */

public class InitializeAppiumWeChat { 	
	String deviceName = "6SVSAIQWOFK7V4WG";//设备名名称	
	String platformVersion = "7.0";//设备的安卓版本号
	
	//String appName = new OperateConfig().getProp("微信应用");
	String appPackage = new OperateConfig().getProp("微信应用的包名");
	String appActivity = new OperateConfig().getProp("微信应用的启动页面");
		
	public AndroidDriver<?> initializeAppium(AndroidDriver<?> driver) {
		DesiredCapabilities capabilities = new DesiredCapabilities();
		capabilities.setCapability("automationName", "UiAutomator2");
        capabilities.setCapability("unicodeKeyboard",true);//支持中文输入
        capabilities.setCapability("resetKeyboard",true);//重置输入法到原有状态 
        
        /** 测微信小程序 */
        Map<String,Object> chrome_options = new HashMap<String,Object>();
        chrome_options.put("androidProcess", "com.tencent.mm:appbrand0");
        capabilities.setCapability(ChromeOptions.CAPABILITY, chrome_options);

        
		capabilities.setCapability("deviceName", deviceName);
		capabilities.setCapability("platformVersion", platformVersion);
		//capabilities.setCapability("udid", "192.168.27.243:5555"); 
		
        capabilities.setCapability("appPackage", appPackage);
        capabilities.setCapability("appActivity", appActivity);		
		capabilities.setCapability("noSign", true);//避免重新签名
		capabilities.setCapability("noReset", true);//设置不用每次都安装被测app
        //capabilities.setCapability("browserName", appName); 
		
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



