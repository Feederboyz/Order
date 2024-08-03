import MyCalendar from "./InterativeCalendar";
import { useState } from "react";

function Home() {
    const [activeTab, setActiveTab] = useState("openClass");
    return (
        <>
            <div style={{ width: "95%" }}>
                <div className="calendar-container">
                    <MyCalendar activeTab={activeTab} />
                </div>
            </div>
        </>
    );
}

export default Home;
