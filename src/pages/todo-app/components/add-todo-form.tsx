import { addTodo } from "../../../stores/use-todos";

export function AddTodoForm() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          name="todo"
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const todoText = event.currentTarget.todo.value;

  addTodo(todoText);

  event.currentTarget.reset();
}
