# Test Automation Laboratory

Curso: Test Automation for Development Teams: Playwright, Screenplay Pattern and AI-Assisted Automation with GitHub Copilot

Codigo: devtestautoai
Duracion: 21 horas

## 1. Objetivo

Este repositorio contiene el laboratorio utilizado durante el curso de automatizacion de pruebas con Playwright, TypeScript, Screenplay, Serenity/JS y GitHub Copilot.

La metodologia consiste en demostrar ejercicios previamente construidos y validados, reproducir sus comandos y realizar modificaciones pequenas y controladas.

La aplicacion bajo prueba (SUT) utilizara Angular, ASP.NET Core y PostgreSQL.

## 2. Arquitectura

```text
DaDesktop - Windows 11
|
|-- Git
|-- NVM / Node.js / npm
|-- Visual Studio Code
|-- GitHub Copilot Chat
|-- TypeScript
|-- Playwright Test
|-- Chromium
|-- Serenity/JS
|-- Playwright MCP
|
+-- Docker Desktop / WSL 2
    |
    +-- Docker Compose
        |
        |-- frontend
        |   Node.js 22.15.1
        |   Angular 21.2
        |   Angular Material
        |   D3.js 7
        |
        |-- backend
        |   .NET SDK 10
        |   ASP.NET Core 10
        |
        +-- postgres
            PostgreSQL 17
            Database: labdb
            Persistent volume
```

Las herramientas de automatizacion funcionan localmente en Windows.

Docker Compose administra los servicios de la aplicacion bajo prueba.

No se requiere instalar .NET ni PostgreSQL directamente en Windows.

La arquitectura actual utiliza un unico compose.yaml, sin Dockerfiles.

## 3. Versiones del laboratorio

### Host Windows

| Herramienta | Version |
|---|---|
| Windows | Windows 11 Pro |
| PowerShell | 5.1 |
| WSL | 3.0.3 |
| Docker Desktop | 4.96.0 |
| Docker Engine | 29.9.1 |
| Docker Compose | 5.6.0 |
| Git | 2.55.0.windows.5 |
| NVM for Windows | 1.2.2 |
| Node.js | 22.15.1 |
| npm | 10.9.2 |
| VS Code | 1.141.2 |
| Playwright Test | 1.57.0 |
| TypeScript | 5.9.3 |
| @types/node | 24.5.1 |
| Chromium | 143.0.7499.4 |
| Serenity/JS | 3.37.1 |
| Playwright MCP | 0.0.83 |
| Playwright VS Code Extension | 1.1.19 |

### Contenedores

| Servicio | Imagen | Version validada |
|---|---|---|
| frontend | node:22.15.1-bookworm-slim | Node.js 22.15.1 |
| backend | mcr.microsoft.com/dotnet/sdk:10.0 | .NET SDK 10.0.402 |
| postgres | postgres:17-alpine | PostgreSQL 17.11 |

Las versiones internas de imagenes con etiquetas no inmutables pueden cambiar al descargarlas nuevamente.

## 4. Estructura del repositorio

```text
test-automation-playwright-screenplay-copilot/
|
|-- .vscode/
|   +-- mcp.json
|
|-- frontend/
|-- backend/
|-- database/
|
|-- test-automation/
|   |-- package.json
|   +-- package-lock.json
|
|-- practices/
|   +-- practice-00-environment-validation.txt
|
|-- compose.yaml
|-- .gitignore
+-- README.md
```

## 5. Directorio de trabajo

La ruta del laboratorio en DaDesktop es:

```text
C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot
```

Preparar PowerShell:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location $REPO
```

Los comandos Docker Compose deben ejecutarse desde esta carpeta.

## 6. Chuleta de Git

Consultar estado:

```powershell
git status
git branch --show-current
git branch -a
git remote -v
git log --oneline -10
git diff
```

Consultar cambios remotos:

```powershell
git fetch origin
```

Cambiar a una rama existente:

```powershell
git switch NOMBRE_RAMA
```

Actualizar la rama actual:

```powershell
git pull --ff-only
```

Los comandos de creacion de ramas y commits se proporcionaran cuando corresponda.

## 7. Chuleta de NVM y Node.js

```powershell
nvm version
nvm list
nvm current
nvm use 22.15.1
node --version
npm.cmd --version
```

Instalar dependencias existentes del proyecto de automatizacion:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location ($REPO + "\test-automation")
npm.cmd ci
```

Instalar Chromium:

```text
npx.cmd playwright install chromium
```

## 8. Chuleta de Playwright

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location ($REPO + "\test-automation")
```

Consultar versiones:

```text
npx.cmd playwright --version
npx.cmd tsc --version
npm.cmd list --depth=0
```

Abrir Codegen:

```text
npx.cmd playwright codegen https://example.com
```

Abrir UI Mode:

```text
npx.cmd playwright test --ui
```

Abrir Trace Viewer:

```text
npx.cmd playwright show-trace
```

Cuando existan pruebas:

```text
npx.cmd playwright test
npx.cmd playwright test --headed
npx.cmd playwright show-report
```

## 9. Chuleta general de Docker

Preparar directorio:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location $REPO
```

Consultar herramientas:

```powershell
docker --version
docker compose version
docker version
docker info
```

Validar configuracion Compose:

```powershell
docker compose config --quiet
docker compose config --services
```

Descargar imagenes:

```powershell
docker compose pull
```

Crear e iniciar contenedores:

```powershell
docker compose up -d
```

Consultar contenedores:

```powershell
docker compose ps
docker compose ps -a
docker ps -a
```

Consultar imagenes:

```powershell
docker compose images
docker images
```

Consultar logs:

```powershell
docker compose logs --tail 30
docker compose logs --tail 30 frontend
docker compose logs --tail 30 backend
docker compose logs --tail 30 postgres
```

Detener los contenedores:

```powershell
docker compose stop
```

Iniciar contenedores existentes:

```powershell
docker compose start
```

Detener y eliminar contenedores del proyecto:

```powershell
docker compose down
```

Recrear contenedores conservando los volumenes nombrados:

```powershell
docker compose up -d --force-recreate
```

IMPORTANTE:

docker compose down conserva los volumenes nombrados.

docker compose down -v elimina tambien los volumenes del proyecto y puede provocar perdida de datos.

No utilizar down -v para limpiezas ordinarias del laboratorio.

## 10. Acceso al frontend

Entrar al contenedor:

```powershell
docker compose exec frontend sh
```

Comandos dentro del contenedor:

```powershell
node --version
npm --version
ls -la /workspace
exit
```

Ejecutar los mismos comandos desde PowerShell:

```powershell
docker compose exec -T frontend node --version
docker compose exec -T frontend npm --version
docker compose exec -T frontend ls -la /workspace
```

## 11. Acceso al backend

Entrar al contenedor:

```powershell
docker compose exec backend sh
```

Comandos dentro del contenedor:

```powershell
dotnet --version
dotnet --list-sdks
dotnet --list-runtimes
ls -la /workspace
exit
```

Ejecutar los mismos comandos desde PowerShell:

```powershell
docker compose exec -T backend dotnet --version
docker compose exec -T backend dotnet --list-sdks
docker compose exec -T backend dotnet --list-runtimes
docker compose exec -T backend ls -la /workspace
```

## 12. Acceso a PostgreSQL

Entrar al contenedor:

```powershell
docker compose exec postgres sh
```

Comandos dentro del contenedor:

```powershell
psql -U lab -d labdb -c "SELECT version();"
psql -U lab -d labdb -c "SELECT current_database(), current_user;"
psql -U lab -d labdb -c "\l"
exit
```

Ejecutar los mismos comandos desde PowerShell:

```powershell
docker compose exec -T postgres psql -U lab -d labdb -c "SELECT version();"
docker compose exec -T postgres psql -U lab -d labdb -c "SELECT current_database(), current_user;"
docker compose exec -T postgres psql -U lab -d labdb -c "\l"
```

Configuracion:

```text
Database: labdb
Username: lab
Hostname Docker: postgres
Internal port: 5432
```

La contrasena se establece mediante POSTGRES_PASSWORD en .env.

El volumen postgres_data conserva los datos cuando se detienen o recrean los contenedores.

## 13. Configuracion local de PostgreSQL

Antes de iniciar por primera vez Docker Compose se requiere un archivo .env en la raiz.

Generar una contrasena para un ambiente nuevo:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
if (-not (Test-Path ($REPO + "\.env"))) {
    $PASSWORD = "lab_" + [guid]::NewGuid().ToString("N")
    Set-Content -Path ($REPO + "\.env") -Value ("POSTGRES_PASSWORD=" + $PASSWORD) -Encoding ascii
}
```

No subir .env al repositorio.

Cambiar POSTGRES_PASSWORD despues de inicializar el volumen no cambia automaticamente la contrasena interna de PostgreSQL.

## 14. GitHub Copilot y Playwright MCP

Abrir VS Code como usuario normal, no como administrador.

Playwright MCP se configura mediante:

```text
.vscode/mcp.json
```

El servidor usa:

```text
@playwright/mcp@0.0.83
```

El servidor se ejecuta localmente en Windows mediante npx.cmd.

Para validar MCP, abrir GitHub Copilot Chat en modo Agent.

Prompt de comprobacion:

```text
Using the Playwright MCP tools, open https://example.com
and tell me the page title.
```

Resultado esperado:

```text
Example Domain
```

## 15. Practicas

Los archivos de instrucciones se encuentran en practices/.

Cada practica tiene su propio archivo TXT con comandos y validaciones.
