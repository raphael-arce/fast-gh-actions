import { removeTodo, toggleTodoStatus } from "../stores/use-todos";
import type { Todo } from "../types";

export function TodoItem({ todo }: { todo: Todo }) {
  const isCompleted = todo.status === "completed";

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg ${
        isCompleted ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleTodoStatus(todo.id)}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400"
          }`}
        >
          {isCompleted && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <span
          className={`flex-1 transition-all duration-200 ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>

        <button
          onClick={() => removeTodo(todo.id)}
          className="w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
