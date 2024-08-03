import "./Tabs.css";

function Tab({ children, onClick, isActive }) {
    const className = "tab" + (isActive ? " active-tab" : "");
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

function Tabs({ children, activeTab }) {
    let style = {};
    switch (activeTab) {
        // [Teacher] Open Class
        case "openClass":
            // reg
            style.backgroundColor = "#f00";
            break;
        // Order Class
        case "orderClass":
            // green
            style.backgroundColor = "#0f0";
            break;
        // My Class
        case "myClass":
            // blue
            style.backgroundColor = "#00f";
            break;
        default:
            style.backgroundColor = "#ccc";
            break;
    }
    return (
        <div style={style} className="tabs">
            {children}
        </div>
    );
}

export { Tab, Tabs };
