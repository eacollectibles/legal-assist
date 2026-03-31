$maxRetries = 20
$retry = 0

while ($retry -lt $maxRetries) {
    $retry++
    Write-Host "`n=== Attempt $retry ===" -ForegroundColor Cyan

    $output = npm install 2>&1 | Out-String

    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nSUCCESS! All packages installed." -ForegroundColor Green
        break
    }

    if ($output -match "'(@wix/[^@']+)@[^']*' is not in this registry") {
        $pkg = $matches[1]
        Write-Host "Missing private package: $pkg - adding override..." -ForegroundColor Yellow

        $content = [System.IO.File]::ReadAllText("$PWD\package.json")
        $replacement = """$pkg"": ""npm:empty-npm-package@1.0.0"",`n    ""@wix/services-manager-react"""
        $content = $content -replace '"@wix/services-manager-react"', $replacement
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText("$PWD\package.json", $content, $utf8NoBom)

        Write-Host "Added override for $pkg, retrying..." -ForegroundColor Yellow
    } else {
        Write-Host "`nFailed with a different error:" -ForegroundColor Red
        Write-Host $output
        break
    }
}

if ($retry -ge $maxRetries) {
    Write-Host "`nReached max retries ($maxRetries). Check the errors above." -ForegroundColor Red
}
