import "./PermissionOverlay.css";
import { useUser } from "../../contexts/UserContext";

export default function Loading() {
    const { user } = useUser();
    return (
        !user.isLoggedIn && (
            <>
                <div className="permissionOverlay-container permissionOverlay-text">
                    <h1>Permission Denied</h1>
                    <p>
                        You do not have permission to access this page. Please
                        login to continue.
                    </p>
                </div>
            </>
        )
    );
}
