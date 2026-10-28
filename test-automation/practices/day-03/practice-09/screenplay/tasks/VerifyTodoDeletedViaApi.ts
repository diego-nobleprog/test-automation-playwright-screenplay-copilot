import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import {
  GetRequest,
  LastResponse,
  Send,
} from '@serenity-js/rest';

export const VerifyTodoDeletedViaApi = {
  withId: (id: number) =>
    Task.where(
      `#actor verifies todo ${ id } was deleted via API`,

      Send.a(
        GetRequest.to('/api/tasks/' + id),
      ),

      Ensure.that(
        LastResponse.status(),
        equals(404),
      ),
    ),
};
