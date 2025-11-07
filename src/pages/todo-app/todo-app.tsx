import { useTodos } from "../../stores/use-todos";
import { AddTodoForm } from "./components/add-todo-form";
import { Stats } from "./components/stats";
import { Header } from "./components/header";
import { PendingTodos } from "./components/pending-todos";
import { CompletedTodos } from "./components/completed-todos";

export function TodoApp() {
  const { todos } = useTodos();

  const pendingTodos = todos.filter((todo) => todo.status === "pending");
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />

        <AddTodoForm />

        <Stats pendingTodos={pendingTodos} completedTodos={completedTodos} />

        <PendingTodos pendingTodos={pendingTodos} />

        <CompletedTodos completedTodos={completedTodos} />
      </div>
    </div>
  );
}
