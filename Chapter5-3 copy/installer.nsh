!macro customInstall
  WriteRegStr HKCR "sysInfoApp" "URL Protocol" ""
  WriteRegStr HKCR "sysInfoApp" "" "URL:sysInfoApp Protocol Handler"
  WriteRegStr HKCR "sysInfoApp\shell\open\command" "" '"$INSTDIR\SysInfoApp.exe" "%1"'
!macroend
!macro customUninstall
  DeleteRegKey HKCR "sysInfoApp"
  DeleteRegKey HKCR "sysInfoApp\shell\open\command"
!macroend