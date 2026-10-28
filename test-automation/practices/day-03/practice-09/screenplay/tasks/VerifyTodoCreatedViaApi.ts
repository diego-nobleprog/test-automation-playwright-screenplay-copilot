import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

import { TodoItem } from '../models/TodoItem';

interface ExpectedTodo {
  id: number;
  title: string;
}

export const VerifyTodoCreatedViaApi = {
  matching: (expected: ExpectedTodo) =>
    Task.where(
      `#actor verifies created todo ${ expected.id } via API`,

      Ensure.that(
        LastResponse.body<TodoItem>().id,
        equals(expected.id),
      ),

      Ensure.that(
        LastResponse.body<TodoItem>().title,
        equals(expected.title),
      ),

      Ensure.that(
        LastResponse.body<TodoItem>().completed,
        equals(false),
      ),
    ),
};
