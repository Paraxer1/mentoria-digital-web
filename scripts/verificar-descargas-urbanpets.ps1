$ErrorActionPreference = "Stop"

$downloads = @(
    @{
        Name = "UrbanPets-Windows-Instalador.exe"
        Url = "https://github.com/Paraxer1/mentoria-digital-web/releases/download/urbanpets-v1.0.0/UrbanPets-Windows-Instalador.exe"
        Size = 106638448
        Sha256 = "50e9fbb7211a32edb7462b56936075636377bcc1577095c4c8835eaf0712519f"
    },
    @{
        Name = "urbanpets_1.0.0_amd64.deb"
        Url = "https://github.com/Paraxer1/mentoria-digital-web/releases/download/urbanpets-v1.0.0/urbanpets_1.0.0_amd64.deb"
        Size = 81408418
        Sha256 = "84c32167f1cb7becf0e6823ea2dd691070e26874b5695540f07f5f19f350a274"
    }
)

$target = Join-Path $PWD "prueba-descargas"
New-Item -ItemType Directory -Path $target -Force | Out-Null

foreach ($item in $downloads) {
    $file = Join-Path $target $item.Name
    Write-Host "Descargando $($item.Name)..." -ForegroundColor Cyan
    & curl.exe -L --fail --retry 3 --output $file $item.Url
    if ($LASTEXITCODE -ne 0) { throw "curl fallo al descargar $($item.Name)" }

    $actualSize = (Get-Item $file).Length
    $actualHash = (Get-FileHash $file -Algorithm SHA256).Hash.ToLowerInvariant()

    if ($actualSize -ne $item.Size) {
        throw "Tamano incorrecto para $($item.Name): $actualSize bytes; esperado $($item.Size)."
    }
    if ($actualHash -ne $item.Sha256) {
        throw "SHA-256 incorrecto para $($item.Name): $actualHash"
    }

    Write-Host "CORRECTO: $($item.Name) ($actualSize bytes)" -ForegroundColor Green
}

Write-Host "Las dos descargas son completas y coinciden con la Release oficial." -ForegroundColor Green
