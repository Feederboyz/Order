import Modal from "react-modal";
import moment from "moment";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
Modal.setAppElement("#root");
function getIsoDate(date) {
    if (!date) {
        return "";
    }
    return moment(date).format("YYYY-MM-DDThh:mm");
}

function MyModal({
    courses,
    setCourses,
    enroll,
    setEnroll,
    setIsModalOpen,
    selectedEvent,
    setSelectedEvent,
    isOpen,
}) {
    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const activeTab = useOutletContext();
    const { user } = useUser();

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 100,
        },
    };
    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "startTime" || name === "endTime") {
            value = moment(value).toDate();
        }
        setSelectedEvent({
            ...selectedEvent,
            [name]: value,
        });
    };
    const handleOpenClass = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        try {
            const newCourse = {
                username: user.username,
                courseName: data.courseName,
                teacherId: user.userId,
                startTime: data.startTime,
                endTime: data.endTime,
                maxStudents: data.maxStudents,
            };
            const response = await fetch("https://localhost:3080/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse),
            });

            if (response.ok) {
                setCourses([...courses, newCourse]);
                alert("Data updated successfully!");
                handleModalClose();
            } else {
                throw new Error("Failed to update data");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error updating data");
            handleModalClose();
        }
    };

    const handleOrderClass = async (event) => {
        event.preventDefault();
        try {
            const newEnrollment = {
                courseId: selectedEvent.id,
                studentId: user.userId,
            };
            const response = await fetch("https://localhost:3080/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEnrollment),
            });

            if (response.ok) {
                setEnroll([...enroll, newEnrollment]);
                alert("報名成功!");
                handleModalClose();
            } else {
                throw new Error("報名失敗");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("報名失敗");
            handleModalClose();
        }
    };

    const handleSubmit = (event) => {
        if (activeTab === "Open Class") {
            handleOpenClass(event);
        } else if (activeTab === "Order Class") {
            handleOrderClass(event);
        } else if (activeTab === "Delete Class") {
            handleDeleteClass(event);
        }
    };

    const handleDeleteClass = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("https://localhost:3080/courses", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId: selectedEvent.id,
                }),
            });

            if (response.ok) {
                let newCourses = courses.filter(
                    (course) => course.id !== selectedEvent.id
                );
                setCourses(newCourses);
                alert("刪除成功!");
                handleModalClose();
            } else {
                throw new Error("刪除失敗");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("刪除失敗");
            handleModalClose();
        }
    };

    let userTag = (
        <div>
            <label htmlFor="user">
                {activeTab === "Open Class" || activeTab === "Delete Class"
                    ? "老師"
                    : "學生"}
                :
            </label>
            <input
                type="text"
                id="user"
                name="user"
                value={
                    activeTab === "Open Class"
                        ? user.username
                        : selectedEvent && selectedEvent.username
                }
                onChange={handleInputChange}
                readOnly
            />
        </div>
    );
    let courseTag = (
        <div>
            <label htmlFor="courseName">課程名稱:</label>
            <input
                type="text"
                id="courseName"
                name="courseName"
                value={selectedEvent && selectedEvent.courseName}
                onChange={handleInputChange}
                readOnly={activeTab === "Open Class" ? false : true}
            />
        </div>
    );
    let startTag = (
        <div>
            <label htmlFor="startTime">開始:</label>
            <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={selectedEvent && getIsoDate(selectedEvent.startTime)}
                onChange={handleInputChange}
                readOnly={activeTab === "Open Class" ? false : true}
            />
        </div>
    );
    let endTag = (
        <div>
            <label htmlFor="endTime">結束:</label>
            <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={selectedEvent && getIsoDate(selectedEvent.endTime)}
                onChange={handleInputChange}
                readOnly={activeTab === "Open Class" ? false : true}
            />
        </div>
    );
    let maxStudentsTag = (
        <div>
            <label htmlFor="maxStudents">最大人數:</label>
            <input
                type="number"
                min="1"
                step="1"
                id="maxStudents"
                name="maxStudents"
                value={selectedEvent && selectedEvent.maxStudents}
                onChange={handleInputChange}
                readOnly={activeTab === "Open Class" ? false : true}
            />
        </div>
    );

    let submitTag = (
        <div>
            <button type="submit">Submit</button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            // onRequestClose={handleModalClose}
            style={customStyles}
        >
            <form onSubmit={handleSubmit}>
                {userTag}
                {courseTag}
                {startTag}
                {endTag}
                {maxStudentsTag}
                {submitTag}
            </form>
            <button onClick={handleModalClose}>Close</button>
        </Modal>
    );
}

export default MyModal;
