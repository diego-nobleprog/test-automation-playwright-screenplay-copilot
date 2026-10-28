import { Ensure, not } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import {
  Click,
  Navigate,
  isVisible,
} from '@serenity-js/web';

import { TodoList } from '../state/TodoList';

interface TodoReference {
  id: number;
  title: string;
}

export const DeleteTodoViaUi = {
  called: (todo: TodoReference) =>
    Task.where(
      `#actor deletes "${ todo.title }" through the UI`,

      Navigate.to('http://localhost:4200'),

      Ensure.eventually(
        TodoList.taskWithId(todo.id),
        isVisible(),
      ),

      Click.on(
        TodoList.deleteButtonFor(todo.id, todo.title),
      ),

      Ensure.eventually(
        TodoList.taskWithId(todo.id),
        not(isVisible()),
      ),
    ),
};
