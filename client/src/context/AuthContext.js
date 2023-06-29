import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: [],
  isLoggedIn: false,
  token: "",
};

// tạo context và gán state là giá trị khởi tạo
export const AuthContext = createContext(INITIAL_STATE);

// Context wrapper App: App sẽ là children
export const AuthContextProvider = ({ children }) => {
  // dùng Reducer để trả về state và dispatch
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
