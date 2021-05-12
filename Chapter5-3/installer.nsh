!macro customInstall
  WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "SysInfoApp" '"$INSTDIR\SysInfoApp.exe" "%1"'
!macroend
!macro customUninstall
  DeleteRegValue HKCR "Software\Microsoft\Windows\CurrentVersion\Run" "SysInfoApp"
!macroend