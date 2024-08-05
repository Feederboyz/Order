import "./PermissionOverlay.css";

export default function PermissionOverlay({ children }) {
    return (
        <>
            <div className="permissionOverlay-container permissionOverlay-text">
                {children}
            </div>
        </>
    );
}
