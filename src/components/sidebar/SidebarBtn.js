import "./SidebarBtn.css";
export default ({ onClick, isCross }) => {
    return (
        <div className="sidebarBtn" onClick={onClick}>
            <div className={isCross ? "sidebarBtn__active" : ""}></div>
            <div className={isCross ? "sidebarBtn__active" : ""}></div>
            <div className={isCross ? "sidebarBtn__active" : ""}></div>
        </div>
    );
};
