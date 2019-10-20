package com.opnext.face.page;

import com.beeboxes.util.GestureOperation;
import com.beeboxes.util.PageBase;
import com.beeboxes.util.Wait;

import io.appium.java_client.android.AndroidDriver;

/**
 * Description: 微信应用-元素
 * @author dengbin
 * @date 2018年11月06日
 */
public class PageFaceMainActivity extends PageBase  {
	
	public PageFaceMainActivity(AndroidDriver<?> driver) {
		super(driver);
	}

	
	/** 拖动人脸圆圈 */
	public void dragFaceCircle() {
    	Wait.sleep(2000);
		GestureOperation.drag(driver, 408, 185, 147, 145, 3);
		GestureOperation.drag(driver, 147, 145, 147, 1092, 5);
		GestureOperation.drag(driver, 147, 1092, 670, 1092, 3);
		GestureOperation.drag(driver, 670, 1092, 670, 145, 5);
		GestureOperation.drag(driver, 670, 145, 408, 185, 3);
	
	}
	

}
