import { Calendar, momentLocalizer } from "react-big-calendar";
import { useCallback, useRef, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import moment from "moment";
import MyModal from "./MyModal";
import "./rbc-sass/styles.scss";

const localizer = momentLocalizer(moment);

export default function InteractiveCalendar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [courses, setCourses] = useState([]);
    const { user } = useUser();
    const [enroll, setEnroll] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const activeTab = useOutletContext();

    useEffect(() => {
        if (activeTab === "My Class") {
            const courseIdSet = new Set(
                enroll.map((course) => course.courseId)
            );
            setFilteredCourses(
                courses.filter((course) => courseIdSet.has(course.id))
            );
        } else if (activeTab === "Delete Class") {
            setFilteredCourses(
                courses.filter((course) => course.teacherId === user.userId)
            );
        } else {
            setFilteredCourses(courses);
        }
    }, [activeTab, courses, enroll]);

    useEffect(() => {
        async function fetchCourses() {
            let result = await fetch("https://localhost:3080/courses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
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
                `https://localhost:3080/enroll?studentid=${userId}`,
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
            if (activeTab === "Order Class" || activeTab === "Delete Class") {
                window.clearTimeout(clickRef?.current);
                clickRef.current = window.setTimeout(() => {
                    setSelectedEvent(calendarEvent);
                    setIsModalOpen(true);
                }, 250);
            }
        },
        [activeTab]
    );

    const handleSelectSlot = useCallback(
        (slotInfo) => {
            if (activeTab === "Open Class") {
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
        [activeTab]
    );

    return (
        <>
            {activeTab && (
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
            )}
            <MyModal
                courses={courses}
                setEnroll={setEnroll}
                enroll={enroll}
                setCourses={setCourses}
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
}
