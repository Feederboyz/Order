import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CalendarWrapper from "./components/rbc/CalendarWrapper";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Container from "./components/container/Container";
import AuthCode from "./components/auth/AuthCode";
import { UserProvider } from "./contexts/UserContext";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Container />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "signup",
                    element: <Signup />,
                },
                {
                    path: ":tabType",
                    element: <CalendarWrapper />,
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
