package com.beeboxes.datatool.testcase;

import org.testng.Reporter;
import org.testng.annotations.Test;

import com.beeboxes.datatool.page.PagePeopleManagementActivity;
import com.beeboxes.util.CommandExecutor;
import com.beeboxes.util.TestBaseDataTool;

/**
 * Description: DataTool应用--搜索人员的用例
 * @author dengbin
 * @date 2018年11月26日
 * @time 下午1:07:29
 */
public class TestSearchPeople extends TestBaseDataTool {
	
	@Test(description="通过姓名精确搜索人员")
	public void testSearchPeopleByCompleteName() {
		CommandExecutor.executeCommand("adb shell ime set io.appium.android.ime/.UnicodeIME");
		String name = "常客test1";
		PagePeopleManagementActivity peopleManagementPage = new PagePeopleManagementActivity(driver);
		Reporter.log("步骤1：点人员搜索按钮");
		peopleManagementPage.clickSearchPeopleBtn();
		Reporter.log("步骤2：输入完整的人员姓名");
		peopleManagementPage.searchPeople(name);
		Reporter.log("步骤3：点人员搜索按钮");
		peopleManagementPage.clickSearchPeopleBtn();
	}
}
