@echo off 
@for /f "tokens=1,2 delims=:" %%i in ('time/t') do set t=%%i%%j
@set time1=%date:~0,4%%date:~5,2%%date:~8,2%%t:~0,4%%time:~6,2%

@title ִ��appium�ű� 

@echo ------------------------------------AppiumTest----------------------- >>E:\0log\appiumִ��%time1%.txt
@adb shell ime set io.appium.android.ime/.UnicodeIME
@call mvn test >>E:\0log\appiumִ��%time1%.txt
