import styled from "styled-components";
import * as React from "react";

import { Divider, Modal, Box, Typography, Button } from "@mui/material";

const ShowProfile = ({ theme }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userImage = localStorage.getItem("picture");
  const userName = localStorage.getItem("username");
  const userEmail = localStorage.getItem("email");

  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Image src={userImage} alt="" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} theme={theme}>
          <ImageInt src={userImage} />
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {userName}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {userEmail}
            </Typography>
          </Box>
          <Divider variant="middle" color="#fff" />
          <Button variant="outlined">Logout</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ShowProfile;

const Profile = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid;
`;
const Image = styled.img`
  height: 50px;
  border-radius: 50%;
`;
const ImageInt = styled.img`
  height: 80px;
  border-radius: 50%;
`;
const style = {
  position: "absolute",
  textAlign: "center",
  top: "30%",
  left: "90%",
  paddingBottom: "10px",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 200,
  bgcolor: (theme) => (theme === "dark" ? "rgb(54, 53, 58)" : "#fff"),
  color: (theme) => (theme === "dark" ? "#ffff" : "#000"),

  p: 4,
};
