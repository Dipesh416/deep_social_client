import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import { Message } from "./pages/Message/Message";
import { HomePage } from "./pages/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./theme/DarkTheme";
import { Profile } from "./pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getProfileAction(jwt));
  }, [jwt]);

  return (
    
    <ThemeProvider theme={darkTheme}>
      
      <Routes>
        <Route path="/message" element={<Message />} />
        <Route path="/profile" element={<Profile />} />
        
       
        <Route
          path="/*"
          element={jwt ? <HomePage /> : <Authentication />}
        />
       
      </Routes>
      </ThemeProvider>
    
  );
}

export default App;
