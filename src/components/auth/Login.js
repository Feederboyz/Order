import React, { useState } from "react";
import { LoginForm } from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import "./AuthForm.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useUser();
    const BACKEND_URL = "https://localhost:3080/";

    const validateAccount = () => {
        setEmailError("");
        setPasswordError("");
        setSubmitError("");

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email");
            return false;
        }

        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return false;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            return false;
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateAccount()) {
            try {
                const response = await fetch(`${BACKEND_URL}auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                const result = await response.json();
                if (!response.ok) {
                    console.log("Fail", result);
                    setSubmitError(result.message);
                } else {
                    localStorage.setItem("token", result.token);
                    setUser({
                        isLoggedIn: true,
                        userId: result.userId,
                        username: result.username,
                        email: result.email,
                        isTeacher: result.isTeacher,
                        avatar: result.avatar,
                    });
                    navigate("/");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    return (
        <>
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                emailError={emailError}
                passwordError={passwordError}
                submitError={submitError}
                handleSubmit={handleSubmit}
            />
        </>
    );
}
