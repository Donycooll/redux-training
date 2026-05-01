import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Todo from "./Todo";
import { AppContext } from "../AppContext";

const TodosPage = () => {
  const [todosFilter, setTodosFilter] = useState("all");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const showedTodos = todos.filter((task) => {
    if (todosFilter === "completed") {
      return task.isComplete;
    }
    if (todosFilter === "not completed") {
      return !task.isComplete;
    }
    return task;
  });

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
    if (localStorage.getItem("todosFilter")) {
      setTodosFilter(localStorage.getItem("todosFilter"));
    }
  }, []);

  const handleAddTodo = () => {
    const newTask = {
      title: newTodo,
      describtion: "",
      isComplete: false,
      id: uuidv4(),
    };
    setTodos([newTask, ...todos]);
    localStorage.setItem("todos", JSON.stringify([newTask, ...todos]));
    setNewTodo("");
  };

  const handleFilterChange = (value, newValue) => {
    setTodosFilter(newValue);
    localStorage.setItem("todosFilter", newValue);
  };

  //   ###########################

  return (
    <AppContext.Provider
      value={{
        todos,
        setTodos,
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px auto",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "darkblue", position: "sticky", top: "0", background: "white", width: "100%", padding: "10px 0", zIndex: "100" }}>
          قائمة المهام
        </Typography>
        <Stack style={{ width: "100%", alignItems: "center" }}>
          <Stack style={{ width: "100%" }}>
            {showedTodos.length > 0 ? (
              showedTodos.map((task) => {
                return <Todo todo={task} key={task.id} />;
              })
            ) : (
              <Typography
                variant="h5"
                style={{ margin: "30px auto", color: "darkblue" }}
              >
                لا توجد مهام بعد
              </Typography>
            )}
          </Stack>
          <Stack
            style={{
              margin: "10px auto",
              position: "sticky",
              bottom: "20px",
              background: "white",
              width: "100%",
            }}
          >
            <Stack direction={"row"} dir="rtl">
              <TextField
                label="مهمة جديدة"
                fullWidth
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <Button
                variant="outlined"
                disabled={!newTodo}
                onClick={handleAddTodo}
              >
                إضافة
              </Button>
            </Stack>
            <Stack>
              <BottomNavigation
                value={todosFilter}
                onChange={handleFilterChange}
              >
                <BottomNavigationAction
                  label="الغير منجز"
                  value="not completed"
                  icon={<RadioButtonUncheckedIcon />}
                />
                <BottomNavigationAction
                  label="المنجز"
                  value="completed"
                  icon={<RadioButtonCheckedIcon />}
                />
                <BottomNavigationAction
                  label="الكل"
                  value="all"
                  icon={<FormatListBulletedIcon />}
                />
              </BottomNavigation>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </AppContext.Provider>
  );
};

export default TodosPage;
