# GitHub Copilot Instructions

This repository contains a test automation training project.

## Technology stack

- TypeScript
- Playwright
- Serenity/JS
- Screenplay Pattern
- Angular frontend
- ASP.NET Core backend
- PostgreSQL
- Docker Compose

## Test automation architecture

New automation code must follow the existing Serenity/JS Screenplay architecture.

Prefer these responsibilities:

- Actor: represents the user or system performing the scenario.
- Tasks: represent business intentions and actions.
- Questions: retrieve information for assertions.
- State or UI Model: centralizes locators and UI elements.
- Models: represent domain data.

Do not place all API calls, locators, assertions, and cleanup logic directly in the spec when an appropriate Screenplay abstraction can be used.

Before generating new automation code, inspect the existing implementation under:

test-automation/practices/day-03/practice-08/

Use Practice 08 as the architectural reference.

## Playwright and Serenity/JS rules

- Use the Serenity/JS APIs available in this repository.
- Do not invent methods, imports, classes, or APIs.
- Check package.json and existing source code before choosing an API.
- Do not assume that APIs from newer Serenity/JS versions are available.
- Avoid arbitrary waits such as page.waitForTimeout().
- Prefer observable conditions and eventual assertions.
- Prefer stable locators already provided by the application.
- Prefer data-testid when a stable test identifier exists.
- Keep locators centralized in the UI model when possible.

## Test data and independence

- Tests must be independently executable.
- Generate unique test data when required.
- Do not depend on data created by another test.
- Clean up data created by the scenario.

## API and UI scenarios

When a scenario combines API and UI:

- Use API operations for setup or verification when appropriate.
- Use the UI only for the user behavior being demonstrated.
- Keep API responsibilities separated from UI responsibilities.
- Use CallAnApi for Serenity/JS API interactions when following the existing framework.

## Security

- Never hardcode passwords, access tokens, API keys, secrets, or credentials.
- Do not commit secrets to the repository.
- Use environment variables or approved configuration mechanisms when credentials are required.

## AI-generated code

Treat generated code as candidate code, not as automatically correct code.

Before considering generated automation complete:

1. Verify every imported API exists.
2. Verify locators against the real application.
3. Review wait strategies.
4. Verify test independence.
5. Verify cleanup.
6. Verify that no secrets or credentials were introduced.
7. Compile and execute the test.
