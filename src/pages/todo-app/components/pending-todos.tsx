import type { Todo } from "../../../types";
import { TodoItem } from "../../../components/todo-item";

export function PendingTodos({ pendingTodos }: { pendingTodos: Todo[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
        Pending Todos
      </h2>

      {pendingTodos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 text-lg">🎉 All caught up!</div>
          <div className="text-gray-500 text-sm mt-1">No pending tasks</div>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
