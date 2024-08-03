import "./Header.scss";
import { useUser } from "../../contexts/UserContext";
import SidebarBtn from "../sidebar/SidebarBtn";
export default function Header({ isHideSidebar, onClick }) {
    const { user } = useUser();

    return (
        <div id="header">
            <SidebarBtn onClick={onClick} isCross={!isHideSidebar} />
            <div className="header__spacer"></div>
            {user.isLoggedIn && (
                <div className="header__avatar-container">
                    <img
                        className="header__avatar"
                        src={user.avatar}
                        alt="Avatar"
                    ></img>
                </div>
            )}
        </div>
    );
}
