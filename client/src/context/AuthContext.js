import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
    user: [],
    isLoggedIn: false,
    token: ''
}

// tạo context (store) và gán state là giá trị khởi tạo
export const AuthContext = createContext(INITIAL_STATE)

// Context wrapper App: App sẽ là children
export const AuthContextProvider = ({ children }) => {
    // dùng Reducer để trả về state và dispatch
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider
            // đưa các state dùng chung ra phạm vi global (all app đều dùng đc state này)
            value={{
                user: state.user, // lưu info user
                isLoggedIn: state.isLoggedIn, // check user đã login chưa
                token: state.token, // lưu token cho phép user hoạt động
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
