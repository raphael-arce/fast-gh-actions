import { TodoItem } from "../../../components/todo-item";
import type { Todo } from "../../../types";

export function CompletedTodos({ completedTodos }: { completedTodos: Todo[] }) {
  return (
    <>
      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
            Completed Todos
          </h2>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
