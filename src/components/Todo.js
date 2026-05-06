import { Card, Stack, Typography, IconButton } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppContext } from "../AppContext";

import { useState } from "react";
import DeleteWarning from "./DeleteWarning.";
import EditDialog from "./EditDialog";

const Todo = ({ todo }) => {
  const { deleteTodo, toggleComplete, updateTodo } = useAppContext();

  const [currTodo, setCurrTodo] = useState("");

  const [openDeleteWarning, setOpenDeleteWarning] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const confirmDeleteTodo = () => {
    deleteTodo(todo.id);
    setOpenDeleteWarning(false);
  };

  const handleEditTodo = () => {
    setCurrTodo(todo);
    setOpenEditDialog(true);
  };

  const handleSubmitDialog = (curr) => {
    updateTodo({
      id: curr.id,
      title: curr.title,
      describtion: curr.describtion,
    });
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
