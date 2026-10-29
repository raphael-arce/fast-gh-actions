import { Route, Routes } from "react-router";
import { useRedirects } from "./hooks/use-redirects";
import { Login } from "./pages/login";
import { PrivacyPolicy } from "./pages/privacy-policy";
import { Register } from "./pages/register";
import { TodoApp } from "./pages/todo-app/todo-app";

function App() {
  useRedirects();

  return (
    <Routes>
      <Route index element={<TodoApp />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
