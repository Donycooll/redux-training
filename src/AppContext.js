import { createContext, useState, useContext, useEffect } from "react";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

export const AppContext = createContext([]);

export const ContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todosFilter, setTodosFilter] = useState("all");

  const { user } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("todosFilter")) {
      setTodosFilter(localStorage.getItem("todosFilter"));
    }
    const fetchTodos = async () => {
      const todosCollection = collection(db, "todos");
      try {
        const todosSnapshot = await getDocs(todosCollection);
        const todosList = todosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredTodos = todosList.filter(
          (task) => task.uid === user?.uid,
        );
        setTodos(filteredTodos);
      } catch (error) {
        alert(error);
      }
    };
    fetchTodos();
  }, [user?.uid, todos]);

  const createTodo = async (text) => {
    try {
      const newTask = {
        title: text,
        describtion: "",
        isComplete: false,
        uid: user.uid,
      };
      const todosCollection = collection(db, "todos");
      await addDoc(todosCollection, newTask);
      setTodos([newTask, ...todos]);
    } catch (error) {
      alert(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await deleteDoc(todoDoc);
      const newTodos = todos.filter((task) => task.id !== id);
      setTodos(newTodos);
    } catch (error) {
      alert(error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoDoc = doc(db, "todos", id);
      const todo = todos.find((task) => task.id === id);
      await updateDoc(todoDoc, { isComplete: !todo.isComplete });
    } catch (error) {
      alert(error);
    }
  };

  const handleFilterChange = (value, newValue) => {
    setTodosFilter(newValue);
    localStorage.setItem("todosFilter", newValue);
  };

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
        createTodo,
        deleteTodo,
        toggleComplete,
        todosFilter,
        setTodosFilter,
        handleFilterChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
