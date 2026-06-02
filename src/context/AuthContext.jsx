import {createContext, useContext, useState} from "react";
import {loginUser, registerUser} from "../services/api/authApi";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "oday_dashboard_auth";

function getStoredAuth() {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedAuth) {
        return {
            user: null,
            token: null,
        };
    }

    return JSON.parse(storedAuth);
}

export function AuthProvider({children}) {
    const storedAuth = getStoredAuth();

    const [user, setUser] = useState(storedAuth.user);
    const [token, setToken] = useState(storedAuth.token);
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    const isAuthenticated = Boolean(user && token);

    async function login(credentials) {
        setIsAuthLoading(true);

        try {
            const result = await loginUser(credentials);

            setUser(result.user);
            setToken(result.token);

            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));

            return result;
        } finally {
            setIsAuthLoading(false);
        }
    }

    async function register(data) {
        setIsAuthLoading(true);

        try {
            const result = await registerUser(data);

            setUser(result.user);
            setToken(result.token);

            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(result));

            return result;
        } finally {
            setIsAuthLoading(false);
        }
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
   

    function hasRole(allowedRoles) {
        if (!user) return false;
        return allowedRoles.includes(user.role);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                isAuthLoading,
                login,
                register,
                logout,
                hasRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}
