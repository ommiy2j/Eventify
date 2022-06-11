import React, { useEffect, useState } from "react";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./utils/Globalstyle";
import { darkTheme, lightTheme } from "./utils/Theme";
import Welcome from "./components/Welcome";
import { setUserLogin } from "./features/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Events from "./components/Events";
import Bus from "./utils/Bus";
import { Flash } from "./components/Flash";
import Event from "./components/Event";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import ShowProfile from "./components/Profile/ShowProfile";
import { getServerData } from "./utils/getServerData";

const App = () => {
  window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

  const [theme, setTheme] = useState("dark");
  const [auth, setAuth] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pic, setpic] = useState("");

  const responseSuccessGoogle = (response) => {
    setLoading(true);
    fetch("http://localhost:8000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.tokenId,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then((result) => {
        dispatch(
          setUserLogin({
            name: result.name,
            token: result.token,
          })
        );
        console.log(result);
        setpic(result.picture);
        localStorage.setItem("userData", result);
        localStorage.setItem("picture", result.picture);
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.name);
        localStorage.setItem("userId", result.userId);
        const remTime = 6 * 60 * 60 * 1000;
        const expiryTime = new Date(new Date().getTime() + remTime);
        localStorage.setItem("expiryTime", expiryTime);
        setAuth(true);
        window.flash("logged In successfully!", "success");
        history.push("/events");
        setLoading(false);
      })
      .catch((err) => {
        window.flash("logged In Failed!", "error");
      });
  };

  const logOutHandler = () => {
    setAuth(false);
    localStorage.clear();
  };

  const setAutoLogOut = (remTime) => {
    setTimeout(() => {
      history.push("/");
      logOutHandler();
    }, remTime);
  };

  const authListner = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    setAuth(true);
    // history.push('/events');
    setLoading(false);
  };

  const getTheme = localStorage.getItem("theme");

  useEffect(() => {
    let expiryTime = localStorage.getItem("expiryTime");
    const token = localStorage.getItem("token");
    if (!token || !expiryTime) {
      return;
    }
    // expiryTime = expiryTime.toISOString();
    const remTime = new Date(
      new Date(expiryTime).getTime() - new Date().getTime()
    );
    setAutoLogOut(remTime);
    authListner();
    localStorage.setItem("theme", theme);
    
  });
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <StyledApp className="App">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        {auth ? (
          <div>
            <DarkToggler>
              <Bulb onClick={themeToggler}>
                {theme === "light" ? (
                  <DarkModeTwoToneIcon color="inherit" />
                ) : (
                  <LightModeTwoToneIcon color="inherit" />
                )}
              </Bulb>
              <LogOut theme={theme}>
                <IconButton
                  color="inherit"
                  aria-label="delete"
                  auth={auth}
                  onClick={() => {
                    logOutHandler();
                    history.push("/");
                    window.flash("logged out successfully!", "success");
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </LogOut>
              <ShowProfile theme={theme} />
            </DarkToggler>
            <Switch>
              <Route
                exact
                path="/events"
                render={() => <Events theme={theme} />}
              />
              <Route path="/:userId" render={() => <Event theme={theme} />} />
              <Redirect to="/events" />
            </Switch>
          </div>
        ) : (
          <div>
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <Welcome responseSuccessGoogle={responseSuccessGoogle} />
                )}
              />
            </Switch>
          </div>
        )}
      </ThemeProvider>
      <Flash />
    </StyledApp>
  );
};
export default App;

const StyledApp = styled.div`
  /* height:100vh; */
  /* background-color: ${(props) => props.theme.body}; */
`;
const DarkToggler = styled.div`
  position: fixed;
  top: 0px;
  right: 10px;
  width: 200px;
  height: 50px;
  cursor: pointer;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Bulb = styled.div``;
const LogOut = styled.div`
  color: ${(p) => (p.theme === "dark" ? "#fff" : "#000")};
`;
