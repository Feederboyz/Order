import "./Sidebar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser, initializUser } from "../../contexts/UserContext";

export default function Sidebar({ activeTab, setActiveTab, isHide }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useUser();
    const useLogout = () => {
        localStorage.removeItem("token");
        initializUser(setUser);
    };

    const isActive = (tab, pathname) => {
        return pathname === "/" && activeTab === tab;
    };
    const tabArray = ["Open Class", "Delete Class", "Order Class", "My Class"];
    return (
        <>
            <div
                id={"sidebar"}
                className={isHide ? "sidebar__hide" : undefined}
            >
                <div className="sidebar-menu">
                    {tabArray.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveTab(tab);
                                navigate("/");
                            }}
                            className={
                                isActive(tab, location.pathname)
                                    ? "sidebar-button__active"
                                    : undefined
                            }
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="sidebar-hr">
                    <hr />
                </div>
                <div className="sidebar-bottom">
                    {user.isLoggedIn ? (
                        <button onClick={useLogout}>Logout</button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    navigate("./login");
                                }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    navigate("./signup");
                                }}
                            >
                                Sign up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
