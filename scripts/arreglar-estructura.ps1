$ErrorActionPreference = 'Stop'

$root = (Get-Location).Path
$nestedNames = @('mentoria-digital-web', 'mentoria-digital')

function Merge-Directory([string]$source, [string]$destination) {
    New-Item -ItemType Directory -Path $destination -Force | Out-Null
    Get-ChildItem -LiteralPath $source -Force | ForEach-Object {
        $target = Join-Path $destination $_.Name
        if ($_.PSIsContainer) {
            Merge-Directory $_.FullName $target
        } else {
            Copy-Item -LiteralPath $_.FullName -Destination $target -Force
        }
    }
}

foreach ($name in $nestedNames) {
    $nested = Join-Path $root $name
    if (-not (Test-Path (Join-Path $nested 'index.html'))) {
        continue
    }

    Write-Host "Moviendo el contenido de $name a la raíz..." -ForegroundColor Cyan
    Get-ChildItem -LiteralPath $nested -Force | ForEach-Object {
        if ($_.Name -eq '.git') {
            return
        }

        $destination = Join-Path $root $_.Name
        if ($_.PSIsContainer) {
            Merge-Directory $_.FullName $destination
        } else {
            Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
        }
    }
    Remove-Item -LiteralPath $nested -Recurse -Force
}

$releaseFolder = Join-Path $root 'UrbanPets-1.0-release-assets'
if (Test-Path $releaseFolder) {
    $outside = Join-Path (Split-Path $root -Parent) 'UrbanPets-1.0-release-assets'
    if (Test-Path $outside) {
        $outside = "$outside-$(Get-Date -Format yyyyMMdd-HHmmss)"
    }
    Move-Item -LiteralPath $releaseFolder -Destination $outside
    Write-Host "Instaladores movidos fuera del repositorio: $outside" -ForegroundColor Yellow
}

Write-Host 'Estructura corregida. Ejecuta ahora:' -ForegroundColor Green
Write-Host '  python scripts/validate-site.py'
Write-Host '  git add -A'
Write-Host '  git commit -m "Corrige estructura y rutas de Urban Pets"'
Write-Host '  git push origin main'
