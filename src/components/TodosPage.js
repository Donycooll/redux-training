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
import LogoutIcon from "@mui/icons-material/Logout";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { replace, useNavigate } from "react-router-dom";

import Todo from "./Todo";
import { useAppContext } from "../AppContext";
import { useAuth } from "../AuthContext";

const TodosPage = () => {
  const { todos, setTodos, todosFilter, handleFilterChange } = useAppContext();
  const [newTodo, setNewTodo] = useState("");
  const { handleLogout, user } = useAuth();
  const navigate = useNavigate();

  const showedTodos = todos.filter((task) => {
    if (todosFilter === "completed") {
      return task.isComplete;
    }
    if (todosFilter === "not completed") {
      return !task.isComplete;
    }
    return task;
  });

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

  const logout = async () => {
    try {
      await handleLogout();
      navigate("/login", replace);
    } catch (error) {
      alert(error.message);
    }
  };

  //   ###########################

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px auto",
      }}
    >
      <Stack style={{ width: "100%", alignItems: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "darkblue",
            position: "sticky",
            top: "0",
            background: "white",
            width: "100%",
            padding: "10px 0",
            zIndex: "100",
          }}
        >
          قائمة المهام
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          style={{background:'red'}}
        >
          <LogoutIcon />
          <Typography variant="body2" style={{ marginLeft: "10px" }}>
            {user && user.email}
          </Typography>
        </Button>
      </Stack>
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
              style={{ marginTop: "20px" }}
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
  );
};

export default TodosPage;
