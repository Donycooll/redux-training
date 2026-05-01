import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

const EditDialog = ({
  currTodo,
  openEditDialog,
  setOpenEditDialog,
  handleSubmitDialog,
}) => {
  const [curr, setCurr] = useState(null);

  useEffect(() => {
    setCurr(currTodo);
  }, [currTodo]);

  return (
    <>
      {curr && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} dir="rtl">
          <DialogTitle>تعديل المهمة</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmitDialog} id="subscription-form">
              <TextField
                required
                margin="dense"
                id="title"
                name="title"
                label="عنوان المهمة"
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
                label="وصف المهمة"
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
            <Button onClick={() => setOpenEditDialog(false)}>
              إلغاء
            </Button>
            <Button
              onClick={() => handleSubmitDialog(curr)}
              disabled={!curr.title}
            >
              تأكيد التغييرات
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default EditDialog;
