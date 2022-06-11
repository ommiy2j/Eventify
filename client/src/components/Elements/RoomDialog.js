import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getServerData } from "../../utils/getServerData";

const RoomDialog = ({ addPop, refId }) => {
  console.log(addPop);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const inputRef = useRef();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addRooms = () => {
    const reference_id = refId;
    fetch("http://localhost:8000/api/server/addroom", {
      method: "POST",
      body: JSON.stringify({
        reference_id,
        roomName: value,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        handleClose();
        getServerData(reference_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ListItem disablePadding onClick={handleClickOpen}>
        <ListItemButton sx={{ ml: 1, mr: 1, mt: 3, mb: 3 }}>
          <ListItemIcon></ListItemIcon>
          <AddIcon />
          <ListItemText sx={{ ml: 1, mr: 1 }} primary="Create Room" />
        </ListItemButton>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <TextField
            ref={inputRef}
            autoFocus
            margin="dense"
            id="name"
            label="Room Name"
            type="text"
            fullWidth
            onChange={(e) => setValue(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addRooms}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoomDialog;
