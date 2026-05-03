import { createContext, useState, useContext, useEffect } from "react";

export const AppContext = createContext([]);

export const ContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todosFilter, setTodosFilter] = useState("all");

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
    if (localStorage.getItem("todosFilter")) {
      setTodosFilter(localStorage.getItem("todosFilter"));
    }
  }, []);

  const handleFilterChange = (value, newValue) => {
    setTodosFilter(newValue);
    localStorage.setItem("todosFilter", newValue);
  };

  return (
    <AppContext.Provider
      value={{ todos, setTodos, todosFilter, setTodosFilter, handleFilterChange }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
