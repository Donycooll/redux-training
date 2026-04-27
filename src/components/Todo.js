import { Card, Stack, Typography, IconButton } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Todo = ({ todo, handleDeleteTodo, toggleComplete, handleEditTodo }) => {
  return (
    <Card style={{  margin: "10px 0" }}>
      <Stack direction={"row"}>
        <Stack
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            textAlign: "start",
          }}
        >
          <Typography variant="h4">{todo.title}</Typography>
          <Typography variant="p1">{todo.describtion}</Typography>
        </Stack>
        <Stack direction={"row"} style={{ width: "30%", alignItems: "center" }}>
          <IconButton>
            <CheckCircleOutlineOutlinedIcon
              style={{ color: todo.isComplete ? "green" : "gray" }}
              onClick={() => toggleComplete(todo.id)}
            />
          </IconButton>
          <IconButton>
            <EditOutlinedIcon
              style={{ color: "blue" }}
              onClick={() => handleEditTodo(todo.id)}
            />
          </IconButton>
          <IconButton>
            <DeleteOutlineOutlinedIcon
              style={{ color: "red" }}
              onClick={() => handleDeleteTodo(todo.id)}
            />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
};

export default Todo;
