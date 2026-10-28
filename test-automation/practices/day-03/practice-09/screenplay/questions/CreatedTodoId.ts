import { LastResponse } from '@serenity-js/rest';

import { TodoItem } from '../models/TodoItem';

export const CreatedTodoId = () =>
  LastResponse
    .body<TodoItem>()
    .id;
