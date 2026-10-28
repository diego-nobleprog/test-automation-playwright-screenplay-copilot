---
applyTo: "test-automation/**/*.ts"
---

# Test Automation TypeScript Instructions

These instructions apply specifically to TypeScript test automation code.

## Architecture

Follow the Serenity/JS Screenplay Pattern used in Practice 08.

Before creating new code, inspect:

test-automation/practices/day-03/practice-08/

Maintain separation of responsibilities:

- Specs orchestrate the scenario.
- Tasks represent business actions and intentions.
- Questions retrieve information used by assertions.
- State or UI Model objects centralize locators.
- Models represent domain data.

Do not place the complete implementation directly in the spec.

## Serenity/JS

This repository uses Serenity/JS 3.37.1.

Only use APIs available in the installed version.

Before using a Serenity/JS method:

1. Check package.json.
2. Inspect similar code already working in this repository.
3. Reuse existing patterns whenever possible.
4. Do not invent fluent APIs or methods based on newer documentation.

## UI automation

Prefer existing stable application hooks.

For Todo items, prefer the existing data-testid convention:

task-<id>

Keep selectors in the State or UI Model instead of scattering them across Tasks or specs.

Do not use arbitrary sleeps or fixed waits.

Avoid:

page.waitForTimeout(...)

Prefer observable conditions and Serenity/JS eventual assertions.

## API automation

Use Serenity/JS REST capabilities when implementing Screenplay API interactions.

Use CallAnApi as an Actor ability.

Keep API setup, verification, and cleanup in dedicated Screenplay abstractions when appropriate.

## Test data

Every generated test must be independently executable.

Use unique data when creating Todo items.

Do not rely on tasks created by previous tests.

Clean up any data created by the scenario unless the scenario itself removes it.

## Generated code review

Generated code is not considered complete until it has been reviewed.

Check:

- imports
- installed API compatibility
- locator stability
- waits
- test independence
- cleanup
- secrets
- compilation
- real execution
