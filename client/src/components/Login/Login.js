import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { isEmpty, isEmail } from "../helper/validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Input/Input";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";

const initialState = {
  name: "",
  password: "",
};

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialState);
  const { email, password } = data;
  const { dispatch } = useContext(AuthContext);

  console.log("g_id: ", process.env.REACT_APP_G_CLIENT_ID);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const login = async (e) => {
    e.preventDefault();
    // check fields
    if (isEmpty(email) || isEmpty(password))
      return toast("Please fill in all fields.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    // check email
    if (!isEmail(email))
      return toast("Please enter a valid email addresss.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    try {
      await axios.post("/api/auth/signing", { email, password });
      //khi login thành công gán vào localStorage 1 gía trị
      localStorage.setItem("_appSignging", true);
      dispatch({ type: "SIGNING" });
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const googleSuccess = async (res) => {
    const token = res?.tokenId;
    try {
      await axios.post("/api/auth/google_signing", { tokenId: token });
      localStorage.setItem("_appSignging", true);
      dispatch({ type: "SIGNING" });
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const googleError = () => {
    toast("There was an error signing in, please try again later.", {
      className: "toast-failed",
      bodyClassName: "toast-failed",
    });
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_G_CLIENT_ID,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  return (
    <>
      <ToastContainer />
      <form className="login" onSubmit={login}>
        <Input
          type="email"
          text="Email"
          name="email"
          handleChange={handleChange}
        />
        <Input
          name="password"
          type={visible ? "text" : "password"}
          icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
          text="Password"
          handleClick={handleClick}
          handleChange={handleChange}
        />
        <div className="login_btn">
          <button type="submit">login</button>

          {/* login width google */}
          <GoogleLogin
            clientId={process.env.REACT_APP_G_CLIENT_ID}
            render={(renderProps) => (
              <button
                className="btn-alt"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                sign in <FcGoogle />
              </button>
            )}
            cookiePolicy={"single_host_origin"}
            onSuccess={googleSuccess}
            onFailure={googleError}
            isSignedIn={true}
          />
        </div>
      </form>
    </>
  );
};

export default Login;
