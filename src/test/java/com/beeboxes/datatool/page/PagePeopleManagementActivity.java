package com.beeboxes.datatool.page;

import org.openqa.selenium.By;
import org.openqa.selenium.support.PageFactory;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;
import io.appium.java_client.pagefactory.AppiumFieldDecorator;

/**
 * Description: DataTool应用-人员管理页面-元素
 * @author dengbin
 * @date 2018年11月06日
 */
public class PagePeopleManagementActivity {
    public AndroidDriver<?> driver;
	public PagePeopleManagementActivity(AndroidDriver<?> driver) {
		this.driver = driver;
		PageFactory.initElements(new AppiumFieldDecorator(driver), this);
	}//定义构造函数，初始化PageFactory
	
	@AndroidFindBy(id="com.opnext.datatool:id/add_person")
	AndroidElement rl_single_add_people;//"添加人员"
	@AndroidFindBy(id="com.opnext.datatool:id/add_people")
	AndroidElement rl_batch_add_people;//"批量添加"
	@AndroidFindBy(id="com.opnext.datatool:id/segment_control")
	AndroidElement v_people_data_switch;//"人员管理 or 数据管理"
	@AndroidFindBy(id="com.opnext.datatool:id/iv_refresh")
	AndroidElement iv_refresh_people;//"刷新"
	@AndroidFindBy(id="com.opnext.datatool:id/iv_search")
	AndroidElement iv_search_people;//"搜索"按钮
	
	@AndroidFindBy(id="com.opnext.datatool:id/iv_back")
	AndroidElement iv_back;//--批量导入结果--"返回按钮"
	@AndroidFindBy(id="com.opnext.datatool:id/et_search")
	AndroidElement et_search;//"搜索框"
	
	@AndroidFindBy(id="com.opnext.datatool:id/iv_default_photo")
	AndroidElement rl_add_face_picture;//"添加人脸图片"
	@AndroidFindBy(id="com.opnext.datatool:id/et_person_id")
	AndroidElement et_people_id;//"人员编号"
	@AndroidFindBy(id="com.opnext.datatool:id/et_person_name")
	AndroidElement et_people_name;//"姓名"
	@AndroidFindBy(id="com.opnext.datatool:id/et_gate_id")
	AndroidElement et_gate_id;//"门禁编号"
	@AndroidFindBy(id="com.opnext.datatool:id/et_ic_id")
	AndroidElement et_ic_id;//"IC卡号"
	@AndroidFindBy(id="com.opnext.datatool:id/btn_save_person")
	AndroidElement btn_save_people;//"保存"
	
	
	@AndroidFindBy(id="com.opnext.setting:id/actionbar_back")
	AndroidElement iv_batch_back;//批量添加人员-选人员规则-返回按钮
	@AndroidFindBy(id="com.opnext.setting:id/actionbar_advanced")
	AndroidElement tv_person_rule_add;//批量添加人员-选人员规则-新增按钮
	@AndroidFindBy(id="com.opnext.setting:id/btn_keep_show")
	AndroidElement tv_rule_next_step;//批量添加人员-选人员规则-下一步按钮
	@AndroidFindBy(id="com.opnext.datatool:id/btn_next")
	AndroidElement tv_excel_next_step;//批量添加人员-选人员excel表或人脸图片文件夹-下一步按钮
	
	
	
	/** 单机版-点单个添加人员 */
	public void clickSingleAddPeople() {
		rl_single_add_people.click();
	}
	
	/** 人员管理-批量导入结果-点页面的返回按钮*/
	public void clickBack() {
		iv_back.click();
	}
	
	/** 单机版-单个添加人员-添加人脸图片  */
	public void clickAddFacePicture() {
		rl_add_face_picture.click();
	}
	
	/** 单机版-单个添加人员-输入人员id */
	public void inputPeopleId(String id) {
		et_people_id.sendKeys(id);
	}
	
	/** 单机版-单个添加人员-输入人员姓名name */
	public void inputPeopleName(String name) {
		et_people_name.sendKeys(name);
	}
	
	/** 单机版-单个添加人员-输入人员的门禁编号 */
	public void inputGateId(String gateId) {
		et_people_name.sendKeys(gateId);
	}
	
	/** 单机版-单个添加人员-输入人员的IC卡号 */
	public void inputIcId(String icId) {
		et_people_name.sendKeys(icId);
	}
	
	/** 单机版-单个添加人员-添加后保存 */
	public void clickSave() {
		btn_save_people.click();
	}	
	
	/** 人员管理-点刷新按钮 */
	public void clickRefresh() {
		iv_refresh_people.click();
	}
	
	/** 人员管理-点搜索按钮 */
	public void clickSearchPeopleBtn() {
		iv_search_people.click();
	}
	
	/** 人员管理-根据人员姓名或id来搜索人员 */
	public void searchPeople(String searchContent) {
		et_search.sendKeys(searchContent);
	}
	
	/** 人员管理-点数据管理 */
	public void clickDataManagement() {
		v_people_data_switch.click();
	}
	
	/** 人员管理-点人员管理 */
	public void clickPeopleManagement() {
		v_people_data_switch.click();
	}
	
	/** 人员管理-点批量添加 */
	public void clickBatchAddPeople() {
		rl_batch_add_people.click();
	}
	
	/** 人员管理-批量添加-选人员规则-点页面返回按钮 */
	public void clickBatchBack() {
		iv_batch_back.click();
	}
	
	/** 人员管理-批量添加-选人员规则-点页面返回按钮 */
	public void clickPersonRuleAdd() {
		tv_person_rule_add.click();
	}
		
	/** 人员管理-批量添加-选人员规则-点页面下一步按钮 */
	public void clickRuleNextStep() {
		tv_rule_next_step.click();
	}
	
	/** 人员管理-批量添加-选人员所在的文件夹(放的有人员excel表和人员图片文件夹) */
	public void clickPeopleDir(String fileDir ) {
		driver.findElement(By.name(fileDir)).click();
	}
	
	/** 人员管理-批量添加-导入人员表-选人员表excel */
	public void clickPeopleExcelFile(String peopleExcel) {
		driver.findElement(By.name(peopleExcel)).click();
	}
	
	/** 人员管理-批量添加-选人员excel表或人脸图片文件夹-点下一步 */
	public void clickExcelOrPictureNextStep() {
		tv_excel_next_step.click();
	}

	/** 人员管理-批量添加-人员图片所在的文件夹(第index个文件夹) */
	public void clickPicDir(int index) {
		driver.findElements(By.id("com.opnext.datatool:id/selected")).get(index).click();
	}
}
