import Modal from "react-modal";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import "./CalendarModal.scss";
Modal.setAppElement("#root");
function getIsoDate(date) {
    if (!date) {
        return "";
    }
    return moment(date).format("YYYY-MM-DDThh:mm");
}

function CalendarModal({
    courses,
    setCourses,
    enroll,
    setEnroll,
    setIsModalOpen,
    selectedEvent,
    setSelectedEvent,
    isOpen,
}) {
    const { tabType } = useParams();
    const { user } = useUser();

    const handleModalClose = () => {
        setIsModalOpen(false);
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
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/courses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCourse),
                }
            );

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

    const handleEditClass = async (event) => {
        event.preventDefault();
        console.log(selectedEvent.id);
        console.log(selectedEvent.username);
        console.log(selectedEvent.course_name);
        console.log(selectedEvent.teacher_id);
        console.log(selectedEvent.start_time);
        console.log(selectedEvent.end_time);
        console.log(selectedEvent.max_students);
        try {
            const newCourse = {
                id: selectedEvent.id,
                username: selectedEvent.username,
                courseName: selectedEvent.courseName,
                teacherId: selectedEvent.teacherId,
                startTime: selectedEvent.startTime,
                endTime: selectedEvent.endTime,
                maxStudents: selectedEvent.maxStudents,
            };
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/courses`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(),
                }
            );

            if (response.ok) {
                let newCourses = courses.filter(
                    (course) => course.id !== selectedEvent.id
                );
                newCourses.push(newCourse);
                setCourses(newCourses);
                alert("Edit successful!");
                handleModalClose();
            } else {
                throw new Error("Edit failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Edit failed");
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
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/enroll`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newEnrollment),
                }
            );

            if (response.ok) {
                setEnroll([...enroll, newEnrollment]);
                alert("Sign up successful!");
                handleModalClose();
            } else {
                throw new Error("Sign up failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Sign up failed");
            handleModalClose();
        }
    };

    const handleSubmit = (event) => {
        if (tabType === "open-class") {
            handleOpenClass(event);
        } else if (tabType === "order-class") {
            handleOrderClass(event);
        } else if (tabType === "edit-class") {
            handleEditClass(event);
        } else if (tabType === "delete-class") {
            handleDeleteClass(event);
        }
    };

    const handleDeleteClass = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/courses`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        courseId: selectedEvent.id,
                    }),
                }
            );

            if (response.ok) {
                let newCourses = courses.filter(
                    (course) => course.id !== selectedEvent.id
                );
                setCourses(newCourses);
                alert("Delete successful!");
                handleModalClose();
            } else {
                throw new Error("Delete failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Delete failed");
            handleModalClose();
        }
    };

    let userTag = (
        <div>
            <label htmlFor="user">
                {tabType === "open-class" ||
                tabType === "delete-class" ||
                tabType === "edit-class"
                    ? "Teacher"
                    : "Student"}
            </label>
            <input
                type="text"
                id="user"
                name="user"
                value={
                    tabType === "open-class"
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
            <label htmlFor="courseName">Course name</label>
            <input
                type="text"
                id="courseName"
                name="courseName"
                value={selectedEvent && selectedEvent.courseName}
                onChange={handleInputChange}
                readOnly={
                    tabType === "open-class" || tabType === "edit-class"
                        ? false
                        : true
                }
            />
        </div>
    );
    let startTag = (
        <div>
            <label htmlFor="startTime">Start</label>
            <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={selectedEvent && getIsoDate(selectedEvent.startTime)}
                onChange={handleInputChange}
                readOnly={
                    tabType === "open-class" || tabType === "edit-class"
                        ? false
                        : true
                }
            />
        </div>
    );
    let endTag = (
        <div>
            <label htmlFor="endTime">End</label>
            <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={selectedEvent && getIsoDate(selectedEvent.endTime)}
                onChange={handleInputChange}
                readOnly={
                    tabType === "open-class" || tabType === "edit-class"
                        ? false
                        : true
                }
            />
        </div>
    );
    let maxStudentsTag = (
        <div>
            <label htmlFor="maxStudents">Maximum number</label>
            <input
                type="number"
                min="1"
                step="1"
                id="maxStudents"
                name="maxStudents"
                value={selectedEvent && selectedEvent.maxStudents}
                onChange={handleInputChange}
                readOnly={
                    tabType === "open-class" || tabType === "edit-class"
                        ? false
                        : true
                }
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
            id="calendar-model"
            className="calendar-modal"
            overlayClassName="calendar-modal__overlay"
        >
            <form id="calendar-model__form" onSubmit={handleSubmit}>
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

export default CalendarModal;
