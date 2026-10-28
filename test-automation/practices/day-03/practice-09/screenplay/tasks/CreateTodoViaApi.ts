import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import {
  LastResponse,
  PostRequest,
  Send,
} from '@serenity-js/rest';

export const CreateTodoViaApi = {
  called: (title: string) =>
    Task.where(
      `#actor creates "${ title }" via API`,

      Send.a(
        PostRequest
          .to('/api/tasks')
          .with({ title }),
      ),

      Ensure.that(
        LastResponse.status(),
        equals(201),
      ),
    ),
};
