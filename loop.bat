@echo off 
@for /f "tokens=1,2 delims=:" %%i in ('time/t') do set t=%%i%%j
@set time1=%date:~0,4%%date:~5,2%%date:~8,2%%t:~0,4%%time:~6,2%

@title ִ��appium�ű� 
@set TIME=5
@timeout %TIME%

:AppiumTest  
@set /a i+=1
@echo ------------------------------------AppiumTest-----��%i%��----------------------- >>E:\0log\appiumִ��%time1%.txt
echo ------------------------------------AppiumTest-----��%i%��-----------------------
@net time \\127.0.0.1
@adb connect 192.168.28.203
@call mvn test >>E:\0log\appiumִ��%time1%.txt
@timeout %TIME%

goto AppiumTest