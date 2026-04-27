import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

const EditDialog = ({ open, handleClose, handleSubmit, todo }) => {
  const [curr, setCurr] = useState(todo);

  useEffect(() => {
    setCurr(todo);
  }, [todo]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              required
              margin="dense"
              id="title"
              name="title"
              label="Todo Title"
              type="text"
              fullWidth
              variant="standard"
              value={curr.title}
              onChange={(e) => setCurr({ ...curr, title: e.target.value })}
            />
            <TextField
              margin="dense"
              id="describtion"
              name="describtion"
              label="Todo describtion"
              type="text"
              fullWidth
              variant="standard"
              value={curr.describtion}
              onChange={(e) =>
                setCurr({ ...curr, describtion: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit(curr)}>Confirm Changes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDialog;
