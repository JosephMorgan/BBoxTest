package com.beeboxes.datatool.testcase;

import java.util.ArrayList;

import io.appium.java_client.android.AndroidDriver;

import org.testng.Reporter;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.beeboxes.base.InitializeAppium;
import com.beeboxes.base.OperateConfig;
import com.beeboxes.base.ReadCSV;
import com.beeboxes.base.Wait;
import com.beeboxes.datatool.page.PagePeopleManagementActivity;

/**
 * Description: DataTool应用--单机版单个添加人员的用例
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
		Wait.sleep(5000);
		driver.quit();
	}
	
	@Test(description="单机版的单个添加人员",dataProvider="dataSingleAddPeople")
	public void testSingleAddPeople(String personId,String personName) {
		PagePeopleManagementActivity peopleManagementPage = new PagePeopleManagementActivity(driver);
		Reporter.log("步骤1：点添加人员");
		peopleManagementPage.clickSingleAddPeople();
		Reporter.log("步骤2：录入人脸图片");
		peopleManagementPage.clickAddFacePicture();
		Wait.sleep(3000);
		Reporter.log("步骤3：输入人员的id");
		peopleManagementPage.inputPeopleId(personId);
		Reporter.log("步骤4：输入人员的姓名");
		peopleManagementPage.inputPeopleName(personName);
		Reporter.log("步骤5：输入完人员信息后保存");
		peopleManagementPage.clickSave();
			
	}
	
	@DataProvider(name="dataSingleAddPeople")
	public Object[][] providePeopleTemplate() {
		String peopleDataFilePath = new OperateConfig().getProp("单个添加人员的参数文件");
		ArrayList<String[]> dataArrayList = ReadCSV.readCSVFile(peopleDataFilePath);
		int row = dataArrayList.size();
		Object[][] peopleData = new Object[row][2];
		for(int i = 0 ; i < row ; i++) {
			peopleData[i][0] = dataArrayList.get(i)[0];
			peopleData[i][1] = dataArrayList.get(i)[1];
		}		
		return peopleData;
	}

}
