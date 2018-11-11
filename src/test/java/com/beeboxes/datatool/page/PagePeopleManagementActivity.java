package com.beeboxes.datatool.page;

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
	AndroidElement iv_search_people;//"搜索"
	
	@AndroidFindBy(id="com.opnext.datatool:id/iv_back")
	AndroidElement iv_back;//"返回按钮"
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
	
	public void clickSingleAddPeople() {
		rl_single_add_people.click();
	}
	
	public void clickBack() {
		iv_back.click();
	}
	
	public void clickAddFacePicture() {
		rl_add_face_picture.click();
	}
	
	public void inputPeopleId() {
		et_people_id.sendKeys("1");
	}
	
	public void inputPeopleName() {
		et_people_name.sendKeys("张三");
	}
	
	public void clickSave() {
		btn_save_people.click();
	}
	
	
	public void clickSearchPeople() {
		iv_search_people.click();
	}

}
