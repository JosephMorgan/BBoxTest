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
import com.beeboxes.base.SwipeScreen;
import com.beeboxes.base.Wait;
import com.beeboxes.datatool.page.PagePeopleManagementActivity;

/**
 * Description: DataTool应用--单机版批量添加人员的用例
 * @author dengbin
 * @date 2018年11月22日
 * @time 下午8:02:32
 */
public class TestBatchAddPeople {
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
	
	@Test(description="单机版批量添加人员",dataProvider="dataBatchAddPeople",invocationCount=1,threadPoolSize=1)
	public void testBatchAddPeople(String peopleExcel,String peoplePicture) {
		PagePeopleManagementActivity peopleManagementPage = new PagePeopleManagementActivity(driver);
		String fileDir = new OperateConfig().getProp("批量添加人员的文件夹");
		String picParentDir = new OperateConfig().getProp("批量添加人员的图片文件夹");
		Reporter.log("步骤1：点批量添加人员");
		peopleManagementPage.clickBatchAddPeople();
		Reporter.log("步骤2：点选择人员规则的下一步");
		peopleManagementPage.clickRuleNextStep();
		Reporter.log("步骤3：选人员所在的文件夹");
		peopleManagementPage.clickPeopleDir(fileDir);
		Reporter.log("步骤4：选择人员Excel表");
		Wait.sleep(2000);
		if (peopleExcel != null) {		
			switch(peopleExcel) {
			case "import7.xlsx":
			case "import8.xlsx":
			case "import9.xlsx":
			case "import10.xlsx":
				SwipeScreen.swipeScreen(driver, "up",230);
				peopleManagementPage.clickPeopleExcelFile(peopleExcel);break;
			default:
				peopleManagementPage.clickPeopleExcelFile(peopleExcel);break;
			}
		}
		Reporter.log("步骤5：点导入人员的下一步");
		peopleManagementPage.clickExcelOrPictureNextStep();
		Reporter.log("步骤6：选择图片所在的文件夹");
		peopleManagementPage.clickPeopleDir(fileDir);
		peopleManagementPage.clickPeopleDir(picParentDir);
		Wait.sleep(2000);
		if (peoplePicture != null) {
			switch(peoplePicture) {
			case "7":
			case "8": 
			case "9": 
				SwipeScreen.swipeScreen(driver, "up",230);
				peopleManagementPage.clickPicDir(Integer.parseInt(peoplePicture)-1);break;
			default:peopleManagementPage.clickPicDir(Integer.parseInt(peoplePicture));break;
			}
		}
		Reporter.log("步骤7：点选择图片文件夹的下一步");
		peopleManagementPage.clickExcelOrPictureNextStep();
		Reporter.log("步骤8：批量添加结束后点返回");
		peopleManagementPage.clickBack();
		Wait.sleep(3000);
	}
	
	@DataProvider(name="dataBatchAddPeople")
	public Object[][] provideBatchAddPeopleTemplate() {
		String peopleDataFilePath = new OperateConfig().getProp("批量添加人员的参数文件");
		ArrayList<String[]> dataArrayList = ReadCSV.readCSVFile(peopleDataFilePath);
		int row = dataArrayList.size();
		Object[][] peopleData = new Object[row][2];
		for (int i = 0; i < row; i++) {
			peopleData[i][0] = dataArrayList.get(i)[0];
			peopleData[i][1] = dataArrayList.get(i)[1];
		}		
		return peopleData;
	}

}
