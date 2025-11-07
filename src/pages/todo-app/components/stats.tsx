import type { Todo } from "../../../types";

export function Stats({
  pendingTodos,
  completedTodos,
}: {
  pendingTodos: Todo[];
  completedTodos: Todo[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-orange-500">
          {pendingTodos.length}
        </div>
        <div className="text-gray-600 text-sm">Pending</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-green-500">
          {completedTodos.length}
        </div>
        <div className="text-gray-600 text-sm">Completed</div>
      </div>
    </div>
  );
}
