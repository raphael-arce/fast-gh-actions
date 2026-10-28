import type { Status, Todo } from "../types";
import { create } from "zustand";

type TodoStore = {
  todos: Todo[];
};

export const useTodos = create<TodoStore>()(() => ({
  todos: [],
}));

export function addTodo(text: string) {
  const { todos } = useTodos.getState();

  const todo = {
    id: crypto.randomUUID(),
    text,
    status: "pending",
  } as const;

  todos.push(todo);

  useTodos.setState({ todos });
}

export function removeTodo(id: string) {
  const { todos } = useTodos.getState();

  // Remove the todo with the given id
  const newTodos = todos.filter((todo) => todo.id === id);

  useTodos.setState({ todos: newTodos });
}

export function toggleTodoStatus(id: string) {
  const { todos } = useTodos.getState();

  const newTodos = todos.map((todo) => {
    if (todo.id !== id) {
      return todo;
    }

    const { status } = todo;

    const newStatus: Status = status === "completed" ? "pending" : "completed";

    return {
      ...todo,
      status: newStatus,
    };
  });

  useTodos.setState({ todos: newTodos });
}
