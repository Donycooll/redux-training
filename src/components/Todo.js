import { Card, Stack, Typography, IconButton } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppContext } from "../AppContext";

import { useState } from "react";
import DeleteWarning from "./DeleteWarning.";
import EditDialog from "./EditDialog";

const Todo = ({ todo }) => {
  const { todos, setTodos } = useAppContext();

  const [currTodo, setCurrTodo] = useState("");

  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const { deleteTodo, toggleComplete } = useAppContext();

  const [openEditDialog, setOpenEditDialog] = useState(false);

  // const toggleComplete = () => {
  //   const newTodos = todos.map((task) => {
  //     if (task.id === todo.id) {
  //       return { ...task, isComplete: !task.isComplete };
  //     }
  //     return task;
  //   });
  //   localStorage.setItem("todos", JSON.stringify(newTodos));
  //   setTodos(newTodos);
  // };

  const confirmDeleteTodo = () => {
    deleteTodo(todo.id);
    setOpenDeleteWarning(false);
  };

  const handleEditTodo = () => {
    const selectedTodo = todos.find((task) => task.id === todo.id);
    setCurrTodo(selectedTodo);
    setOpenEditDialog(true);
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
    setOpenEditDialog(false);
  };

  return (
    <>
      <Card style={{ margin: "10px 0", direction: "rtl" }}>
        <Stack
          direction={"row"}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Stack
            style={{
              display: "flex",
              justifyContent: "space-between",

              textAlign: "start",
            }}
          >
            <Typography variant="h4">{todo.title}</Typography>
            <Typography variant="p1">{todo.describtion}</Typography>
          </Stack>
          <Stack direction={"row"} style={{ alignItems: "center" }}>
            <IconButton>
              <CheckCircleOutlineOutlinedIcon
                style={{ color: todo.isComplete ? "green" : "gray" }}
                onClick={() => toggleComplete(todo.id)}
              />
            </IconButton>
            <IconButton>
              <EditOutlinedIcon
                style={{ color: "blue" }}
                onClick={() => handleEditTodo()}
              />
            </IconButton>
            <IconButton>
              <DeleteOutlineOutlinedIcon
                style={{ color: "red" }}
                onClick={() => setOpenDeleteWarning(true)}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
      <DeleteWarning
        openDeleteWarning={openDeleteWarning}
        setOpenDeleteWarning={setOpenDeleteWarning}
        confirmDeleteTodo={confirmDeleteTodo}
      />
      <EditDialog
        currTodo={currTodo}
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        handleSubmitDialog={handleSubmitDialog}
      />
    </>
  );
};

export default Todo;
