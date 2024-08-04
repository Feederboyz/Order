import "./Sidebar.scss";
import { useNavigate, Link } from "react-router-dom";
import { useUser, initializUser } from "../../contexts/UserContext";
import { useState } from "react";
import SidebarData from "./SidebarData";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";

function SidebarLabel({ children }) {
    return <span className="sidebar__label">{children}</span>;
}

function SidebarBtn({ children, onClick, preIcon, postIcon }) {
    return (
        <button className="sidebar__button" onClick={onClick}>
            <div>{preIcon}</div>
            <div>
                <SidebarLabel> {children} </SidebarLabel>
            </div>
            <div style={{ flexGrow: 1 }} />
            <div>{postIcon}</div>
        </button>
    );
}

function DropdownBtn({
    icon,
    onClick,
    children,
    isOpened,
    iconOpened,
    iconClosed,
}) {
    return (
        <SidebarBtn
            preIcon={icon}
            onClick={onClick}
            postIcon={isOpened ? iconOpened : iconClosed}
        >
            {children}
        </SidebarBtn>
    );
}

function DropdownLink({ children, to, preIcon, postIcon }) {
    return (
        <Link to={to} className="sidebar__dropdownLink">
            <div>{preIcon}</div>
            <div>
                <SidebarLabel> {children} </SidebarLabel>
            </div>
            <div style={{ flexGrow: 1 }} />
            <div>{postIcon}</div>
        </Link>
    );
}

function SidebarMenu({ item }) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <DropdownBtn
                icon={item.icon}
                onClick={showSubnav}
                isOpened={subnav}
                iconOpened={item.iconOpened}
                iconClosed={item.iconClosed}
            >
                {item.title}
            </DropdownBtn>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink
                            to={item.path}
                            key={index}
                            preIcon={item.icon}
                        >
                            {item.title}
                        </DropdownLink>
                    );
                })}
        </>
    );
}

export default function Sidebar({ isHide }) {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const useLogout = () => {
        localStorage.removeItem("token");
        initializUser(setUser);
    };

    return (
        <>
            <nav id="sidebar" className={isHide ? "sidebar__hide" : undefined}>
                {SidebarData.map((item, index) => (
                    <SidebarMenu item={item} key={index} />
                ))}
                <div style={{ flexGrow: 1 }} />
                <hr id="sidebar-hr" />
                {user.isLoggedIn ? (
                    <SidebarBtn
                        onClick={useLogout}
                        preIcon={<AiOutlineLogout />}
                    >
                        Logout
                    </SidebarBtn>
                ) : (
                    <>
                        <SidebarBtn
                            onClick={() => {
                                navigate("./login");
                            }}
                            preIcon={<AiOutlineLogin />}
                        >
                            Login
                        </SidebarBtn>
                        <SidebarBtn
                            onClick={() => {
                                navigate("./signup");
                            }}
                            preIcon={<AiOutlineLogin />}
                        >
                            Sign up
                        </SidebarBtn>
                    </>
                )}
            </nav>
        </>
    );
}
