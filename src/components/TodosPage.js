import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Todo from "./Todo";
import EditDialog from "./EditDialog";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
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

  const handleDeleteTodo = (taskId) => {
    const newTodos = todos.filter((task) => task.id !== taskId);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleComplete = (taskId) => {
    const newTodos = todos.map((task) => {
      if (task.id === taskId) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleEditTodo = (taskId) => {
    const selectedTodo = todos.find((task) => task.id === taskId);
    setCurrTodo(selectedTodo);
    setOpenEditDialog(true);
  };

  //   ###########################

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currTodo, setCurrTodo] = useState("");

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSubmitDialog = (curr) => {
    const newTodos = todos.map((task) => {
      if (curr.id === task.id) {
        return {
          ...task,
          title: curr.title,
          describtion: curr.describtion,
        };
      }
      return task;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    handleCloseDialog();
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
      <Typography variant="h3" sx={{ fontWeight: "bold", color:'darkblue' }}>
        My Todos
      </Typography>
      <Stack style={{width: '100%', alignItems:'center'}}>
        <Stack style={{width: '100%'}} >
          {todos.length > 0 ? (
            todos.map((task) => {
              return (
                <Todo
                  todo={task}
                  handleDeleteTodo={handleDeleteTodo}
                  toggleComplete={toggleComplete}
                  handleEditTodo={handleEditTodo}
                  key={task.id}
                />
              );
            })
          ) : (
            <Typography
              variant="h5"
              style={{ margin: "30px auto", color: "darkblue" }}
            >
              No Tasks Yet
            </Typography>
          )}
        </Stack>
        <Stack direction={"row"} style={{ margin: "10px auto", position:'sticky', bottom:'20px', background:'white', width:'100%' }}>
          <TextField
            label="New Task"
            fullWidth
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            variant="outlined"
            disabled={!newTodo}
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </Stack>
      </Stack>
      <EditDialog
        open={openEditDialog}
        handleClose={handleCloseDialog}
        handleSubmit={handleSubmitDialog}
        todo={currTodo}
        setCurrTodo={setCurrTodo}
      />
    </Container>
  );
};

export default TodosPage;
