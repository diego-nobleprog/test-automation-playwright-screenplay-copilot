# Agent Instructions

This repository contains a training project for test automation using Playwright, Serenity/JS, Screenplay Pattern, and GitHub Copilot.

## Before changing test automation code

Before creating or modifying TypeScript automation code:

1. Inspect package.json to confirm installed dependencies and versions.
2. Inspect the working Screenplay implementation under:

test-automation/practices/day-03/practice-08/

3. Reuse existing architecture and conventions when possible.
4. Do not invent APIs, methods, imports, classes, or framework capabilities.
5. Prefer existing working examples over assumptions based on newer documentation.

## Screenplay architecture

Automation code should express business intentions through Screenplay abstractions.

Prefer:

- Tasks for actions and business intentions.
- Questions for information used in assertions.
- State or UI Model objects for locators.
- Models for domain data.
- Specs for scenario orchestration.

Avoid putting the complete implementation directly in the spec.

## Browser automation

When interacting with the Todo application:

- Inspect the real application before assuming a locator.
- Prefer stable application hooks.
- Prefer data-testid when available.
- Do not introduce arbitrary sleeps.
- Do not use page.waitForTimeout() as a synchronization strategy.
- Prefer observable conditions.

## API automation

For Screenplay API interactions:

- Use CallAnApi.
- Keep API setup, verification, and cleanup separated when appropriate.
- Verify actual endpoint behavior before generating assertions.

## Test independence

Every test must:

- be independently executable
- create unique data when required
- avoid depending on previous tests
- clean up created data when appropriate

## Security

Never introduce:

- passwords
- access tokens
- API keys
- secrets
- credentials

Do not hardcode sensitive values.

## AI-generated code review

Generated code is candidate code.

Before accepting generated code:

1. Verify imports.
2. Verify framework API compatibility.
3. Verify locators.
4. Verify wait strategies.
5. Verify test independence.
6. Verify cleanup.
7. Verify security.
8. Compile the code.
9. Execute the real test.
10. Review the final behavior.
