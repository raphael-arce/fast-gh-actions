import { supabaseClient } from "../../../api/supabase-client";

export function Header() {
  return (
    <header className="flex w-full justify-between gap-4 items-center mb-8">
      <div className="w-22"></div>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">✨ Todo App</h1>
        <p className="text-gray-600">Stay organized and get things done!</p>
      </div>
      <div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-red-600 rounded-lg border border-gray-200/50 hover:border-red-200 transition-all duration-200 shadow-sm hover:shadow-md group-hover:bg-red-50"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

async function handleLogout() {
  await supabaseClient.auth.signOut();
}
