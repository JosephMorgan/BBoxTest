package com.beeboxes.datatool.testcase;

import io.appium.java_client.android.AndroidDriver;

import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.beeboxes.base.InitializeAppium;
import com.beeboxes.base.Wait;
import com.beeboxes.datatool.page.PagePeopleManagementActivity;

/**
 * Description: DataTool应用--搜索人员的用例
 * @author dengbin
 * @date 2018年11月26日
 * @time 下午1:07:29
 */
public class TestSearchPeople {
	public AndroidDriver<?> driver;
	
	@BeforeClass
	public void beforeClass() {
		driver = new InitializeAppium().initializeAppium(driver);
	}

	@AfterClass
	public void afterClass() {
		Wait.sleep(5000);
		driver.quit();
	}
	
	@Test(description="通过姓名精确搜索人员")
	public void testSearchPeopleByCompleteName() {
		PagePeopleManagementActivity peopleManagementPage = new PagePeopleManagementActivity(driver);
		peopleManagementPage.clickSearchPeopleBtn();
		peopleManagementPage.searchPeople("小云45001");
		peopleManagementPage.clickSearchPeopleBtn();
	}
}
