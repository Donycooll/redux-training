import "./App.css";

import TodosPage from "./components/TodosPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { ContextProvider } from "./AppContext";

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { Protected } from "./components/Protected";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ContextProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <Protected>
                  <TodosPage />
                </Protected>
              }
            />
          </Routes>
        </ContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
