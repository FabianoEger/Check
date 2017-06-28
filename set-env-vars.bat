@ECHO OFF
echo Stating config tokens...
:loop
echo Write a value to DEVICE_TOKEN
set /p DEVICE_TOKEN=
if "%DEVICE_TOKEN%" == "" (
    echo DEVICE_TOKEN can not be null
    goto loop
)
:loop1
echo Write a value to DEVICE_TOKEN_TO_SUBTRACT_TIMESTAMP
set /p DEVICE_TOKEN_TO_SUBTRACT_TIMESTAMP=
if "%DEVICE_TOKEN_TO_SUBTRACT_TIMESTAMP%" == "" (
    echo DEVICE_TOKEN_TO_SUBTRACT_TIMESTAMP can not be null
    goto loop1
)
:loop2
echo Write a value to DEVICE_TOKEN_TO_SECOND_SERVICE
set /p DEVICE_TOKEN_TO_SECOND_SERVICE=
if "%DEVICE_TOKEN_TO_SECOND_SERVICE%" == "" (
    echo DEVICE_TOKEN_TO_SECOND_SERVICE can not be null
    goto loop2
)

echo End config tokens