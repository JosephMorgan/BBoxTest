@echo off 
@for /f "tokens=1,2 delims=:" %%i in ('time/t') do set t=%%i%%j
@set time1=%date:~0,4%%date:~5,2%%date:~8,2%%t:~0,4%%time:~6,2%

@title ִ��appium�ű� 

:loop
set logPath="C:\Users\Administrator\Desktop\appiumlog\appiumִ��%time1%.txt"
echo %logPath%
set /a num += 1
@echo ---------------------��%num%��---AppiumTest----------------------- >>%logPath%
@call mvn test >>%logPath%
::cd SaaS��Ŀ¼pom1(�·�����Ա����Ա)
::call mvn test
::cd �ն˵�Ŀ¼pom2��������Ա����Ա������Ա��
::call mvn test

::pause

goto loop