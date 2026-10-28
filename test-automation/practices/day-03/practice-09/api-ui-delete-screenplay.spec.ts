import { test } from '@serenity-js/playwright-test';
import { CallAnApi } from '@serenity-js/rest';

import { CreatedTodoId } from './screenplay/questions/CreatedTodoId';
import { CreateTodoViaApi } from './screenplay/tasks/CreateTodoViaApi';
import { CleanupTodoViaApi } from './screenplay/tasks/CleanupTodoViaApi';
import { DeleteTodoViaUi } from './screenplay/tasks/DeleteTodoViaUi';
import { VerifyTodoDeletedViaApi } from './screenplay/tasks/VerifyTodoDeletedViaApi';
import { VerifyTodoCreatedViaApi } from './screenplay/tasks/VerifyTodoCreatedViaApi';

test('create a todo via API, delete it through the UI, and verify its removal via API', async ({ actor }) => {
  const title = 'P9 Screenplay UI deletion ' + Date.now();
  let taskId: number | undefined;

  actor.whoCan(
    CallAnApi.at('http://localhost:8080'),
  );

  try {
    await actor.attemptsTo(
      CreateTodoViaApi.called(title),
    );

    taskId = await actor.answer(
      CreatedTodoId(),
    );

    await actor.attemptsTo(
      VerifyTodoCreatedViaApi.matching({
        id: taskId,
        title,
      }),
    );

    await actor.attemptsTo(
      DeleteTodoViaUi.called({
        id: taskId,
        title,
      }),

      VerifyTodoDeletedViaApi.withId(taskId),
    );
  } finally {
    if (taskId !== undefined) {
      await actor.attemptsTo(
        CleanupTodoViaApi.withId(taskId),
      );
    }
  }
});
