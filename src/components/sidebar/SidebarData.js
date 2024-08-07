import React from "react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
const SidebarData = [
    {
        title: "Teacher",
        icon: <AiIcons.AiOutlineUser />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "Open Class",
                path: "/open-class",
                icon: <FaIcons.FaRegCalendarAlt />,
            },
            {
                title: "Edit Class",
                path: "/edit-class",
                icon: <Fa6Icons.FaGear />,
            },
            {
                title: "Delete Class",
                path: "/delete-class",
                icon: <AiIcons.AiFillDelete />,
            },
        ],
    },
    {
        title: "Student",
        icon: <AiIcons.AiOutlineUser />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: "Order Class",
                path: "/order-class",
                icon: <FaIcons.FaRegCalendarAlt />,
            },
            {
                title: "My Class",
                path: "/my-class",
                icon: <AiIcons.AiOutlineUser />,
            },
        ],
    },
];
export default SidebarData;
