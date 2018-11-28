package com.beeboxes.base;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

public class Screenshot {
	//截图方法	
	public static void snapshot(TakesScreenshot drivername,String filename) {
	     File scrFile = drivername.getScreenshotAs(OutputType.FILE);
		  try {
			System.out.println("Save snapshot path is:D:/snapshot/"+filename);
			FileUtils.copyFile(scrFile, new File("D:\\snapshot\\"+filename));
		} catch (Exception e) {
			System.out.println("Can't save screenshot");
			e.printStackTrace();
		}
		finally
		{
			System.out.println("Screen shot finished");
		}
	  }


}
