import { usePathname } from "./hooks/use-pathname";
import { useRedirects } from "./hooks/use-redirects";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { TodoApp } from "./pages/todo-app/todo-app";
import { useSession } from "./stores/use-session";

function App() {
  const { session } = useSession();
  const pathname = usePathname();

  useRedirects();

  if (session) {
    return <TodoApp />;
  }

  if (pathname.includes("/register")) {
    return <Register />;
  }

  if (pathname.includes("/login")) {
    return <Login />;
  }

  return <></>;
}

export default App;
