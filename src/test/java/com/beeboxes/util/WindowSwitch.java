package com.beeboxes.util;

import io.appium.java_client.android.AndroidDriver;

import java.util.Set;

/**
 * Description: web窗口的切换
 * @author dengbin
 * @date 2019年10月14日
 * @time 下午11:50:50
 */
public class WindowSwitch {

	/**微信小程序的窗口切换*/
	public static void switchtoWindow(AndroidDriver<?> driver,String windowTitle) {
		Set<String>  contextNames = driver.getContextHandles();
        for(String contextName : contextNames) {
        	smallProgram:if(contextName.contains("tencent.mm:appbrand0")){
                driver.context(contextName);
                Set<String> windowHandles = driver.getWindowHandles();
                for(String wid : windowHandles) {
                    driver.switchTo().window(wid);
                    String title = driver.getTitle();
                    if (title.contains(windowTitle)) {
                		//System.out.print(driver.getTitle());
                        break smallProgram;
                    }
                }
            }
        }
		
	}
}
 