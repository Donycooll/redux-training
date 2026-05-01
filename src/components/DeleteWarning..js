import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const DeleteWarning = ({
  openDeleteWarning,
  setOpenDeleteWarning,
  confirmDeleteTodo,
}) => {
  return (
    <>
      <Dialog
        open={openDeleteWarning}
        onClose={() => setOpenDeleteWarning(false)}
        dir="rtl"
      >
        <DialogTitle style={{ color: "red" }}>هل أنت متأكد؟</DialogTitle>
        <DialogContent>لن يتم استعادة المهمة المحذوفة.</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteWarning(false)}>إلغاء</Button>
          <Button onClick={() => confirmDeleteTodo()} style={{ color: "red" }}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteWarning;
