@echo off
setlocal enabledelayedexpansion

:: 查找 VSCode 安装路径
set "VSCodePath="
for %%I in (
    "%ProgramFiles%\Microsoft VS Code\bin\code"
    "%ProgramFiles(x86)%\Microsoft VS Code\bin\code"
    "%LocalAppData%\Programs\Microsoft VS Code\bin\code"
    "D:\Programs\Microsoft VS Code\bin\code"
    "D:\Program Files\Microsoft VS Code\bin\code"
    "D:\Program Files (x86)\Microsoft VS Code\bin\code"
) do (
    if exist %%I (
        set "VSCodePath=%%I"
        goto :found
    )
)

:: 检查是否找到 VSCode
echo 无法找到 VSCode 安装路径，请检查是否已安装。
exit /b 1

:found
:: 安装插件
set "plugin=twinny-3.17.30.vsix"
echo 安装 %plugin%
echo %VSCodePath%
%VSCodePath% --install-extension "%plugin%"  --force

endlocal