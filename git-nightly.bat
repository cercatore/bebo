echo @off
echo "adding files."
git.exe --git-dir=%dev-path% add -A
git.exe --git-dir=%dev-path% log
pause