import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InteractiveCalendar from "./components/rbc/InterativeCalendar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Container from "./components/container/Container";
import AuthCode from "./components/auth/AuthCode";
import { UserProvider } from "./contexts/UserContext";
import PermissionOverlay from "./components/overlay/PermissionOverlay";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Container />,
            children: [
                {
                    index: true,
                    element: (
                        <>
                            <PermissionOverlay />
                            <InteractiveCalendar />
                        </>
                    ),
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "signup",
                    element: <Signup />,
                },
            ],
        },
        {
            path: "/authcode",
            element: <AuthCode />,
        },
    ]);

    return (
        <div className="App">
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </div>
    );
}

export default App;
