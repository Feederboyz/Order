import { createContext, useContext, useState } from "react";

const UserContext = createContext({
    user: {
        userId: "",
        isLoggedIn: false,
        username: "",
        email: "",
        is_teacher: false,
        avatar: "",
    },
    setUser: () => {},
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: "",
        email: "",
        is_teacher: false,
        avatar: "",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export const initializUser = (setUser) => {
    setUser({
        userId: "",
        isLoggedIn: false,
        username: "",
        email: "",
        is_teacher: false,
        avatar: "",
    });
};
