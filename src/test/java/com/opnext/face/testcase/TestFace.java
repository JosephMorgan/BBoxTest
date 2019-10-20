package com.opnext.face.testcase;

import org.testng.Reporter;
import org.testng.annotations.Test;

import com.beeboxes.util.TestBaseFace;
import com.opnext.face.page.PageFaceMainActivity;

/**
 * Description: Face应用-人脸应用的用例
 * @author dengbin
 * @date 2018年11月03日
 */
public class TestFace extends TestBaseFace {
	
	@Test(description="拖动人脸圆圈",threadPoolSize=1,invocationCount=3)
	public void testFaceCircle() {
		Reporter.log("步骤1：拖动人脸圆圈");
		new PageFaceMainActivity(driver).dragFaceCircle();
		}
	
	

}
