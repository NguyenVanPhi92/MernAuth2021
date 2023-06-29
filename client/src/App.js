import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActivateLayout from "./Layouts/ActivateLayout/ActivateLayout";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";
import ResetLayout from "./Layouts/ResetLayout/ResetLayout";
import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";

function App() {
  // dùng useContext để lấy ra các state trong Context API
  const { dispatch, token, isLoggedIn } = useContext(AuthContext);

  // get ac token
  useEffect(() => {
    // lấy ra token từ localStorage
    const _appSignging = localStorage.getItem("_appSignging");

    // ...sau đó check... nếu có
    if (_appSignging) {
      const getToken = async () => {
        // call API tạo token tạo quyền truy cập
        const res = await axios.post("/api/auth/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }

    //khi dispatch thay đổi và isLoggedIn thay đổi thì render lại
  }, [dispatch, isLoggedIn]);

  //sau khi tạo quyền truy cập cho usr thì get data user
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("/api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={isLoggedIn ? ProfileLayout : AuthLayout}
        />
        <Route
          path="/auth/reset-password/:token"
          exact
          component={ResetLayout}
        />
        <Route
          path="/api/auth/activate/:activation_token"
          exact
          component={ActivateLayout}
        />
      </Switch>
    </Router>
  );
}

export default App;
