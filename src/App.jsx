import { useState } from "react";
import "./App.css";
import Login from "./components/login";
import api from "./utils/api";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const userInfo = await api.getUserInfo();
      setCurrentUser(userInfo);
      setLoggedIn(true);
    } catch (error) {
      console.error("Error fetching current user data:", error);
    }
  };
  return (
    <>
      <Login onLogin={fetchUserData} />
    </>
  );
}

export default App;
