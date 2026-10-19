$efubNode22 = Join-Path $env:LOCALAPPDATA 'EFUB\node22\node-v22.23.2-win-x64'
if (-not (Test-Path -LiteralPath (Join-Path $efubNode22 'node.exe'))) { throw 'Node 22 installation not found.' }
$env:Path = $efubNode22 + ';' + $env:Path
node --version
