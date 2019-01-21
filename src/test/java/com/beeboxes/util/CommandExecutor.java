package com.beeboxes.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * Description: 执行adb命令
 * @author dengbin
 * @date 2018年12月13日
 * @time 下午3:42:44
 */
public class CommandExecutor {

	public static void main(String[] args) {

	}
	
	/**执行adb命令*/
	public static String executeCommand(String command) {
		BufferedReader br2 = null;
		String line = null;
		StringBuilder strBuilder = null;
		InputStream is = null;
		InputStreamReader isReader = null;
		try {
			Process proc = Runtime.getRuntime().exec(command);
			is = proc.getInputStream();
			isReader = new InputStreamReader(is, "utf-8");
			br2 = new BufferedReader(isReader);
			strBuilder = new StringBuilder();
			while ((line = br2.readLine()) != null) {
				strBuilder.append(line+"\n");
			}
			line = strBuilder.toString();
			return line;
		} catch (IOException e) {
			return line;
		} finally {
			if (isReader != null) {
				try {
					isReader.close();
				} catch (IOException e) {
				}
			}

			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
				}
			}

			if (br2 != null) {
				try {
					br2.close();
				} catch (IOException e) {
				}
			}
		}
	}

}
