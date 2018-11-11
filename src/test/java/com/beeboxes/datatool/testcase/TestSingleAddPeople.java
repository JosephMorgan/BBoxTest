package com.beeboxes.datatool.testcase;

import io.appium.java_client.android.AndroidDriver;

import org.testng.Reporter;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.beeboxes.base.InitializeAppium;
import com.beeboxes.datatool.page.PagePeopleManagementActivity;

/**
 * Description: DataTool应用单机版单个添加人员的用例
 * @author dengbin
 * @date 2018年11月06日
 */
public class TestSingleAddPeople {
	public AndroidDriver<?> driver;

	@BeforeClass
	public void beforeClass() {
		driver = new InitializeAppium().initializeAppium(driver);
	}

	@AfterClass
	public void afterClass() {
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();
	}
	
	@Test(description="单机版的单个添加人员")
	public void testSingleAddPeople() {
		Reporter.log("步骤1：点添加人员");
		new PagePeopleManagementActivity(driver).clickSingleAddPeople();
			
	}

}
