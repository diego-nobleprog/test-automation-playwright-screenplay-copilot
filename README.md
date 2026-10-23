# Test Automation Laboratory

Curso: Test Automation for Development Teams: Playwright, Screenplay Pattern and AI-Assisted Automation with GitHub Copilot

Codigo: devtestautoai
Duracion: 21 horas

## 1. Objetivo

Este repositorio contiene el laboratorio utilizado durante el curso de automatizacion de pruebas con Playwright, TypeScript, Screenplay, Serenity/JS y GitHub Copilot.

La metodologia consiste en demostrar ejercicios previamente construidos y validados, reproducir sus comandos y realizar modificaciones pequenas y controladas.

La aplicacion bajo prueba (SUT) utiliza Angular, ASP.NET Core y PostgreSQL.

Un principio importante del laboratorio es la reproducibilidad:

- Los contenedores pueden eliminarse y recrearse.
- Los volumenes Docker pueden eliminarse y recrearse.
- La base PostgreSQL puede eliminarse y recrearse.
- Las dependencias Node.js no se almacenan en Git.
- Las dependencias se reconstruyen desde package-lock.json.
- El laboratorio no depende de residuos de ejecuciones anteriores.

El objetivo es que el mismo repositorio pueda reconstruir el ambiente tanto en la maquina Instructor como en una maquina Fresh Start.

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

La arquitectura utiliza un unico compose.yaml, sin Dockerfiles.

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
|   |-- package.json
|   |-- package-lock.json
|   +-- src/
|
|-- backend/
|-- database/
|
|-- test-automation/
|   |-- package.json
|   |-- package-lock.json
|   +-- practices/
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

Reconstruir las dependencias del proyecto de automatizacion:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location ($REPO + "\test-automation")
npm.cmd ci
```

Instalar Chromium para Playwright:

```powershell
npx.cmd playwright install chromium
```

node_modules no se almacena en Git.

package-lock.json es la fuente utilizada para reconstruir las dependencias de forma reproducible.

## 8. Chuleta de Playwright

Preparar directorio:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location ($REPO + "\test-automation")
```

Consultar versiones:

```powershell
npx.cmd playwright --version
npx.cmd tsc --version
npm.cmd list --depth=0
```

Abrir Codegen:

```powershell
npx.cmd playwright codegen https://example.com
```

Abrir UI Mode:

```powershell
npx.cmd playwright test --ui
```

Abrir Trace Viewer:

```powershell
npx.cmd playwright show-trace
```

Ejecutar pruebas:

```powershell
npx.cmd playwright test
npx.cmd playwright test --headed
npx.cmd playwright show-report
```

## 9. Chuleta diaria de Docker

Preparar directorio:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location $REPO
```

Los comandos principales para trabajar diariamente son:

```powershell
docker compose up -d
docker compose ps
docker compose restart
docker compose stop
docker compose start
docker compose down
```

Significado:

- docker compose up -d crea los recursos faltantes e inicia los servicios.
- docker compose ps muestra el estado de los servicios.
- docker compose restart reinicia los servicios.
- docker compose stop detiene los contenedores sin eliminarlos.
- docker compose start inicia contenedores previamente detenidos.
- docker compose down elimina los contenedores y la red del proyecto.

Consultar logs:

```powershell
docker compose logs --tail 30
docker compose logs --tail 30 frontend
docker compose logs --tail 30 backend
docker compose logs --tail 30 postgres
```

Validar Compose:

```powershell
docker compose config --quiet
docker compose config --services
```

Consultar imagenes:

```powershell
docker compose images
docker images
```

## 10. Reconstruccion de Docker desde cero

El laboratorio esta preparado para que los recursos Docker puedan eliminarse completamente y reconstruirse.

Eliminar contenedores, red y volumenes del proyecto:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location $REPO

docker compose down -v --remove-orphans
```

Este comando elimina, entre otros recursos:

- contenedores frontend, backend y postgres;
- red Docker Compose;
- volumen postgres_data;
- volumen frontend_node_modules;
- datos almacenados en PostgreSQL.

La eliminacion de estos recursos no destruye el laboratorio.

Reconstruir Docker:

```powershell
docker compose pull
docker compose up -d
docker compose ps
```

Durante el inicio del frontend, Compose ejecuta automaticamente:

```text
npm ci
npx ng serve
```

Las dependencias Angular se reconstruyen utilizando:

```text
frontend/package.json
frontend/package-lock.json
```

El volumen frontend_node_modules contiene las dependencias instaladas dentro del ambiente Docker.

No es necesario almacenar frontend/node_modules en Git.

## 11. Reconstruccion completa en una maquina Fresh Start

Partiendo de:

- Windows y herramientas instaladas durante la Practica 0;
- Docker Desktop funcionando;
- Node.js 22.15.1 activo;
- repositorio clonado;

reconstruir primero la automatizacion local:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"

Set-Location ($REPO + "\test-automation")

npm.cmd ci
npx.cmd playwright install chromium
```

Reconstruir despues la aplicacion bajo prueba:

```powershell
Set-Location $REPO

docker compose pull
docker compose up -d
docker compose ps
```

No se requiere:

- subir node_modules a Git;
- instalar Angular globalmente;
- instalar .NET directamente en Windows;
- instalar PostgreSQL directamente en Windows;
- crear un archivo .env;
- conservar contenedores anteriores;
- conservar volumenes anteriores;
- conservar una base PostgreSQL anterior.

## 12. Prueba de reconstruccion total

Para comprobar la reproducibilidad del laboratorio se puede destruir Docker completamente:

```powershell
$REPO = "C:\Users\student\Desktop\test-automation-playwright-screenplay-copilot"
Set-Location $REPO

docker compose down -v --remove-orphans
```

Tambien pueden eliminarse las dependencias locales de automatizacion:

```powershell
Remove-Item ($REPO + "\test-automation\node_modules") -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item ($env:LOCALAPPDATA + "\ms-playwright") -Recurse -Force -ErrorAction SilentlyContinue
```

Despues se reconstruye:

```powershell
Set-Location ($REPO + "\test-automation")

npm.cmd ci
npx.cmd playwright install chromium

Set-Location $REPO

docker compose pull
docker compose up -d
docker compose ps
```

Validar el frontend:

```powershell
curl.exe -I http://localhost:4200
```

Resultado esperado:

```text
HTTP/1.1 200 OK
```

Validar PostgreSQL:

```powershell
docker compose exec -T postgres psql -U lab -d labdb -c "SELECT current_database(), current_user;"
```

Resultado esperado:

```text
current_database | current_user
-----------------+-------------
labdb            | lab
```

Validar Playwright con la prueba del Dia 1:

```powershell
Set-Location ($REPO + "\test-automation")
npx.cmd playwright test practices/day-01/practice-03/first-ui-test.spec.ts
```

Resultado esperado:

```text
1 passed
```

Este ciclo puede repetirse tantas veces como sea necesario.

## 13. Acceso al frontend

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

## 14. Acceso al backend

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

## 15. Acceso a PostgreSQL

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
Password: lab
Hostname Docker: postgres
Internal port: 5432
```

La contrasena lab es deliberadamente una credencial dummy para el laboratorio local y se encuentra declarada en compose.yaml.

No se requiere archivo .env para PostgreSQL.

El volumen postgres_data conserva los datos mientras exista.

Si postgres_data se elimina, Docker Compose crea un volumen nuevo y PostgreSQL inicializa nuevamente labdb.

## 16. GitHub Copilot y Playwright MCP

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

## 17. Practicas

Los archivos de instrucciones se encuentran en practices/ y test-automation/practices/.

Cada practica tiene su propio archivo TXT con comandos, explicaciones y validaciones.

Las practicas se construyen y validan primero en la maquina Instructor.

Posteriormente se adaptan para que los participantes puedan reproducirlas sobre una maquina Fresh Start.

El repositorio y sus comandos de reconstruccion deben ser suficientes para recuperar el laboratorio sin depender del estado previo de la maquina.
