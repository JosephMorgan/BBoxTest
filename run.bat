@echo off 
@for /f "tokens=1,2 delims=:" %%i in ('time/t') do set t=%%i%%j
@set time1=%date:~0,4%%date:~5,2%%date:~8,2%%t:~0,4%%time:~6,2%

@title 执行appium脚本 

:loop
set logPath="C:\Users\Administrator\Desktop\appiumlog\appium执行%time1%.txt"
echo %logPath%
set /a num += 1
@echo ---------------------第%num%次---AppiumTest----------------------- >>%logPath%
@call mvn test >>%logPath%
::cd SaaS的目录pom1(下发管理员、人员)
::call mvn test
::cd 终端的目录pom2（检查管理员、人员管理人员）
::call mvn test

::pause

goto loop