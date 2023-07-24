import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { getUser, addUser} from "../Database/DatabaseMethods";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children, userData }) => {
    const [user, setUser] = useLocalStorage('user', null);
    const navigate = useNavigate();

    const login = async (data) => {
        if(await getUser(data.username, data.password)){
            setUser(data.username);
            navigate("/dashboard/about", { replace: true });
        }else {
            setUser(null);
            alert("Incorrect Username or Password")
        }
    };

    const register = async (data) => {
        await addUser(await data.username, await data.password)
        console.log("done waiting for addUser()")
        setUser(data.username);
        navigate("/dashboard/about", { replace: true });
    };

    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            register,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
