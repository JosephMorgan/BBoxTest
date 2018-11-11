package com.beeboxes.base;

import io.appium.java_client.TouchAction;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.touch.offset.PointOption;

/**
 * Description: 滑动屏幕
 * @author dengbin
 * @date 2018年6月13日
 * slipSize滑动的大小，滑动多远，坐标点
 */

public class SwipeScreen {

    
	public void swipeScreen(AndroidDriver<?> driver,String direction,int slipSize) {
	    int width = driver.manage().window().getSize().width;
	    int height = driver.manage().window().getSize().height;
	    
	    //向上滑动屏幕
		if("up".equals(direction)) {
		    new TouchAction<>(driver).longPress(PointOption.point(width / 2, height - slipSize))
		        .moveTo(PointOption.point(width / 2, slipSize)).release().perform();
		}
		
		//向下滑动屏幕
		if("down".equals(direction)) {
		    new TouchAction<>(driver).longPress(PointOption.point(width / 2, slipSize))
		        .moveTo(PointOption.point(width / 2, height - slipSize)).release().perform();
		}
		
		//向左滑动屏幕
		if("left".equals(direction)) {
		    new TouchAction<>(driver).longPress(PointOption.point(width - slipSize, height / 2))
		        .moveTo(PointOption.point(slipSize, height / 2)).release().perform();
		}
		
		//向右滑动屏幕
		if("right".equals(direction)) {
		    new TouchAction<>(driver).longPress(PointOption.point(slipSize, height / 2))
		        .moveTo(PointOption.point(width - slipSize, height / 2)).release().perform();
		}
		
	}
}



