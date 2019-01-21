package com.beeboxes.util;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.AndroidKey;
import io.appium.java_client.android.nativekey.KeyEvent;

/**
 * Description: 编辑文本框
 * @author dengbin
 * @date 2018年11月29日
 * @time 下午1:25:58
 */
public class EditText {
	
	/** 移到文本框的结尾，一个一个删除字符 */
	public static void clearText(AndroidDriver<?> driver,String text) {
		driver.pressKey(new KeyEvent(AndroidKey.MOVE_END));
		 for (int i = 0; i < text.length(); i++) {
		        driver.pressKey(new KeyEvent(AndroidKey.DEL));
		    }		
	}

}
