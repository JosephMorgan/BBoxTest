package com.beeboxes.wechat.page;

import org.openqa.selenium.By;

import com.beeboxes.util.PageBase;

import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.AndroidElement;
import io.appium.java_client.pagefactory.AndroidFindBy;

/**
 * Description: 微信应用-微信页的元素
 * @author dengbin
 * @date 2018年11月06日
 */
public class PageWeChatMainActivity extends PageBase  {
	
	public PageWeChatMainActivity(AndroidDriver<?> driver) {
		super(driver);
	}
	
	@AndroidFindBy(xpath="//android.view.View[@text='蜂盒科技开放平台测试1']")
	AndroidElement beeboxes_wechat_test1;//在微信页"蜂盒科技开放平台测试1的会话"
	@AndroidFindBy(xpath="//android.widget.TextView[@text='测试环境']")
	AndroidElement test_env;//"蜂盒科技开放平台测试1的会话"的"测试环境"菜单
	@AndroidFindBy(xpath="//android.widget.TextView[@text='20.16租户2']")
	AndroidElement test16_env;//16服务器的微信访客入口
	
	@AndroidFindBy(xpath="//android.view.View[@text='南京大牌档']")
	AndroidElement nanjing_food_stalls;//在微信页"南京大牌档"
	@AndroidFindBy(xpath="//android.widget.TextView[@text='用餐服务']")
	AndroidElement dining_service;//用餐服务
	@AndroidFindBy(xpath="//android.widget.TextView[@text='点餐取号']")
	AndroidElement order_take_a_number;//点餐取号

	By order_menu = By.xpath("/html/body/wx-view[3]/wx-navigator[1]/wx-text/span[2]");//点击点菜
	By second_store = By.xpath("/html/body/wx-scroll-view/div/div/div/wx-view[1]/wx-view[2]/wx-view[1]/wx-view[1]");//点击南京大牌档

	
	/** 进入蜂盒科技开放平台测试1公众号 */
	public void openBeeboxesWechatTest1() {
		beeboxes_wechat_test1.click();
	}
	/** 进入测试环境 */
	public void openTestEnv() {
		test_env.click();
	}
	/** 进入访客环境 */
	public void openWeChatVistor() {
		test16_env.click();
	}
	
	/** 进入南京大牌档公众号 */
	public void openNanjingFoodStalls() {
		nanjing_food_stalls.click();
	}
	/** 进入用餐服务 */
	public void openDiningService() {
		dining_service.click();
	}
	/** 进入点餐取号 */
	public void openOrderTakeaNumber() {
		order_take_a_number.click();
	}
	/** 在小程序点"点菜"*/
	public void clickOrder() {
		driver.findElement(order_menu).click();
	}
	/** 选第二家店*/
	public void clickSecondStore() {
		driver.findElement(second_store).click();
	}
	

}
