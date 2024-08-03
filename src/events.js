function createDate(year, month, day, hours = 0, minutes = 0) {
    return new Date(year, month - 1, day, hours, minutes);
}

const events = [
    {
        id: 2,
        course: "test",
        startTime: createDate(2024, 7, 15, 4, 0),
        endTime: createDate(2024, 7, 15, 4, 50),
        maxStudents: 5,
        user: "Becca",
    },
];

export default events;
