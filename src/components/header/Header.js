import "./Header.scss";
import { useUser } from "../../contexts/UserContext";
import HeaderBtn from "./HeaderBtn";
export default function Header({ isHideSidebar, onClick }) {
    const { user } = useUser();

    return (
        <div id="header">
            <HeaderBtn onClick={onClick} isCross={!isHideSidebar} />
            <div style={{ flexGrow: 1 }} />
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
