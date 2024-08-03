import { useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
// import Loading from "./Loading.js";
import "./Container.scss";

export default function Container() {
    const [isHideSidebar, setIsHideSidebar] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const { setUser } = useUser();
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = (event) => {
            console.log("Storage change");
            if (event.key === "token") {
                setToken(event.newValue);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (token) {
            fetch("https://localhost:3080/profile", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        console.log(response.status);
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser({
                        isLoggedIn: true,
                        userId: data.user_id,
                        username: data.username,
                        email: data.email,
                        isTeacher: data.is_teacher,
                        avatar: data.avatar,
                    });
                    localStorage.setItem("token", data.token);
                    navigate("/");
                })
                .catch((error) => {
                    console.log(error.toString());
                });
        } else {
            setUser({
                isLoggedIn: false,
                userId: "",
                username: "",
                email: "",
                isTeacher: false,
                avatar: "",
            });
        }
    }, [token, navigate, setUser]);

    return (
        <div className="container">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isHide={isHideSidebar}
            />
            <div className="container-content">
                <Header
                    isHideSidebar={isHideSidebar}
                    onClick={() => {
                        setIsHideSidebar(!isHideSidebar);
                    }}
                />
                <div className="container-content__body">
                    <Outlet context={activeTab} />
                </div>
            </div>
        </div>
    );
}
