import { createContext } from "react";

const authData = {
    is_login: false,
    user: null
};

interface User {
    [key: string]: any;
}

interface AuthData {
    is_login: boolean;
    user: User | null;
}

interface AuthContextType {
    authData: AuthData;
    setAuthData: (value: AuthData) => void;
}

const AuthContext = createContext<AuthContextType>({
    authData,
    setAuthData: (value: AuthData) => {}
});

export default AuthContext;