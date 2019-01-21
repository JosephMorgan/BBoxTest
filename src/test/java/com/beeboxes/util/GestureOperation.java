package com.beeboxes.util;

import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.touch.offset.PointOption;

/**
 * Description: 屏幕的一些基础操作
 * @author dengbin
 * @date 2018年11月13日
 * @time 下午12:48:03
 */
public class GestureOperation {
	
	
	/**点击屏幕上某个坐标点(x,y)*/
	public static void tapSomePoint(AndroidDriver<?> driver,int xOffset, int yOffset) {
		new TouchAction<>(driver).tap(PointOption.point(xOffset, yOffset)).perform();
	}
	/**点击屏幕顶部中间*/
	public static void tapTopMedium(AndroidDriver<?> driver) {
	    int width = driver.manage().window().getSize().width;
		new TouchAction<>(driver).tap(PointOption.point(width/2, 0)).perform();
	}
	
	/**点击屏幕的坐标（400,0）*/
	public static void tapScreen(AndroidDriver<?> driver) {
		new TouchAction<>(driver).tap(PointOption.point(400, 0)).perform();
	}

}
