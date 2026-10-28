import { Ensure, equals, or } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import {
  DeleteRequest,
  LastResponse,
  Send,
} from '@serenity-js/rest';

export const CleanupTodoViaApi = {
  withId: (id: number) =>
    Task.where(
      `#actor ensures todo ${ id } is deleted via API`,

      Send.a(
        DeleteRequest.to('/api/tasks/' + id),
      ),

      Ensure.that(
        LastResponse.status(),
        or(
          equals(204),
          equals(404),
        ),
      ),
    ),
};
