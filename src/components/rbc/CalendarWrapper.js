import { Calendar, momentLocalizer } from "react-big-calendar";
import { useCallback, useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import PermissionOverlay from "../overlay/PermissionOverlay";
import moment from "moment";
import CalendarModal from "./CalendarModal";
import "./rbc-sass/styles.scss";

const localizer = momentLocalizer(moment);

export default function CalendarWrapper() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [enroll, setEnroll] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const { user } = useUser();
    const { tabType } = useParams();

    useEffect(() => {
        if (tabType === "my-class") {
            const courseIdSet = new Set(
                enroll.map((course) => course.courseId)
            );
            setFilteredCourses(
                courses.filter((course) => courseIdSet.has(course.id))
            );
        } else if (tabType === "delete-class") {
            setFilteredCourses(
                courses.filter((course) => course.teacherId === user.userId)
            );
        } else {
            setFilteredCourses(courses);
        }
    }, [tabType, courses, enroll, user]);

    useEffect(() => {
        async function fetchCourses() {
            let result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}courses`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            result = await result.json();
            result = result.map((course) => {
                return {
                    id: course.id,
                    username: course.username,
                    courseName: course.course_name,
                    teacherId: course.teacher_id,
                    startTime: course.start_time,
                    endTime: course.end_time,
                    maxStudents: course.max_students,
                };
            });
            setCourses(result);
        }
        fetchCourses();
    }, []);

    useEffect(() => {
        async function fetchEnroll(userId) {
            let result = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/enroll?studentid=${userId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            result = await result.json();
            result = result.map((enroll) => ({
                courseId: enroll.course_id,
                studentId: enroll.student_id,
            }));
            setEnroll(result);
        }
        if (user.isLoggedIn) {
            fetchEnroll(user.userId);
        }
    }, [user]);

    const clickRef = useRef(null);
    // Prevent a memory leak
    useEffect(() => {
        return () => {
            window.clearTimeout(clickRef?.current);
        };
    }, []);

    const handleSelectEvent = useCallback(
        (calendarEvent) => {
            if (tabType === "order-class" || tabType === "delete-class") {
                window.clearTimeout(clickRef?.current);
                clickRef.current = window.setTimeout(() => {
                    setSelectedEvent(calendarEvent);
                    setIsModalOpen(true);
                }, 250);
            }
        },
        [tabType]
    );

    const handleSelectSlot = useCallback(
        (slotInfo) => {
            if (tabType === "open-class") {
                window.clearTimeout(clickRef?.current);
                const event = {
                    id: "",
                    username: "",
                    courseName: "",
                    startTime: moment(slotInfo.start).toDate(),
                    endTime: moment(slotInfo.start).add(50, "minutes").toDate(),
                    maxStudents: 4,
                };
                clickRef.current = window.setTimeout(() => {
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                }, 250);
            }
        },
        [tabType]
    );
    function isValidTabType(tabType) {
        return [
            "open-class",
            "order-class",
            "delete-class",
            "my-class",
        ].includes(tabType);
    }
    function tabType2Header(tabType) {
        switch (tabType) {
            case "open-class":
                return "Open Class";
            case "order-class":
                return "Order Class";
            case "delete-class":
                return "Delete Class";
            case "my-class":
                return "My Class";
            default:
                return "";
        }
    }
    return (
        <>
            {user.isLoggedIn ? (
                isValidTabType(tabType) && (
                    <>
                        <div className="rbc__title">
                            <h2>{tabType2Header(tabType)}</h2>
                        </div>
                        <Calendar
                            localizer={localizer}
                            events={filteredCourses}
                            titleAccessor="courseName"
                            startAccessor="startTime"
                            endAccessor="endTime"
                            onSelectSlot={handleSelectSlot}
                            onSelectEvent={handleSelectEvent}
                            style={{ height: 500 }}
                            views={{
                                month: true,
                                // week: true,
                                day: false,
                                agenda: true,
                            }}
                            selectable={true}
                        />
                        <CalendarModal
                            courses={courses}
                            setCourses={setCourses}
                            enroll={enroll}
                            setEnroll={setEnroll}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={setSelectedEvent}
                            isOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        />
                    </>
                )
            ) : (
                <PermissionOverlay>
                    <h1>Permission Denied</h1>
                    <p>
                        You do not have permission to access this page. Please
                        login to continue.
                    </p>
                </PermissionOverlay>
            )}
        </>
    );
}
