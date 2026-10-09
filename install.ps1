# OpenWork installer for Windows.
#
#   irm https://github.com/dedeprogames-official/openwork/releases/latest/download/install.ps1 | iex
#
# Installs openwork.exe into %USERPROFILE%\.openwork\bin and adds that folder to your user PATH.
# Set $env:OPENWORK_VERSION (for example "0.1.0") before running it to install a specific version.

& {
    $ErrorActionPreference = "Stop"
    # Invoke-WebRequest renders its progress bar so slowly on Windows PowerShell 5.1 that downloads crawl.
    $ProgressPreference = "SilentlyContinue"
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

    $repo = "dedeprogames-official/openwork"
    $arch = if ($env:PROCESSOR_ARCHITECTURE -eq "ARM64" -or $env:PROCESSOR_ARCHITEW6432 -eq "ARM64") { "arm64" } else { "x64" }
    $target = "windows-$arch"
    if ($arch -eq "x64") {
        # Feature 40 is PF_AVX2_INSTRUCTIONS_AVAILABLE; CPUs without AVX2 need the baseline build.
        if (-not ("OpenWorkInstall.Kernel32" -as [type])) {
            Add-Type -Namespace OpenWorkInstall -Name Kernel32 -MemberDefinition '[DllImport("kernel32.dll")] public static extern bool IsProcessorFeaturePresent(int ProcessorFeature);'
        }
        if (-not [OpenWorkInstall.Kernel32]::IsProcessorFeaturePresent(40)) { $target = "$target-baseline" }
    }

    $asset = "openwork-$target.zip"
    $version = "$env:OPENWORK_VERSION".TrimStart("v")
    $url = if ($version) { "https://github.com/$repo/releases/download/v$version/$asset" } else { "https://github.com/$repo/releases/latest/download/$asset" }
    $installDir = Join-Path $HOME ".openwork\bin"
    $temp = Join-Path ([IO.Path]::GetTempPath()) "openwork-install-$PID"

    Write-Host ""
    Write-Host "Installing OpenWork ($target) from $url"
    New-Item -ItemType Directory -Force -Path $installDir, $temp | Out-Null
    try {
        Invoke-WebRequest -Uri $url -OutFile (Join-Path $temp $asset) -UseBasicParsing
        Expand-Archive -Path (Join-Path $temp $asset) -DestinationPath $temp -Force
        $exe = Join-Path $installDir "openwork.exe"
        # A running openwork.exe cannot be overwritten, but it can be renamed out of the way: that is how it updates itself.
        if (Test-Path $exe) {
            Remove-Item -Force -Path "$exe.old" -ErrorAction SilentlyContinue
            $old = if (Test-Path "$exe.old") { "$exe.$PID.old" } else { "$exe.old" }
            Move-Item -Force -Path $exe -Destination $old
        }
        Move-Item -Force -Path (Join-Path $temp "openwork.exe") -Destination $exe
    } finally {
        Remove-Item -Recurse -Force -Path $temp -ErrorAction SilentlyContinue
    }

    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $entries = @("$userPath" -split ";" | Where-Object { $_ })
    if ($entries -notcontains $installDir) {
        [Environment]::SetEnvironmentVariable("Path", (@($entries) + $installDir) -join ";", "User")
        Write-Host "Added $installDir to your user PATH"
    }
    if (@($env:Path -split ";") -notcontains $installDir) { $env:Path = "$env:Path;$installDir" }

    Write-Host ""
    Write-Host "                                     ▄   "
    Write-Host "█▀▀█ █▀▀█ █▀▀█ █▀▀▄ █░█░█ █▀▀█ █▀▀▀ █ ▄▀"
    Write-Host "█░░█ █░░█ █▀▀▀ █░░█ █░█░█ █░░█ █    █▀▄ "
    Write-Host "▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀  ▀ ▀▀▀▀▀ ▀▀▀▀ ▀    ▀  ▀"
    Write-Host ""
    Write-Host "Deploy agents into your folders. To start:"
    Write-Host ""
    Write-Host "  cd <folder>     # the folder your agents work in"
    Write-Host "  openwork        # then /connect a model and /deploy an agent"
    Write-Host ""
    Write-Host "Open a new terminal if 'openwork' is not found yet. More: https://github.com/$repo"
    Write-Host ""
}
