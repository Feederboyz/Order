import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "./AuthForm";

export default function Signup(props) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordError2, setPasswordError2] = useState("");
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();

    const validateAccount = () => {
        setEmailError("");
        setPasswordError("");
        setPasswordError2("");
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

        if (password !== password2) {
            console.log("passwords do not match");
            setPasswordError2("Passwords do not match");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateAccount()) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const result = await response.json();
                if (!response.ok) {
                    console.log("Error", result);
                    setSubmitError(result.message);
                } else {
                    console.log("Success", result);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error:", error);
                navigate("/");
            }
        }
    };

    return (
        <SignupForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            password2={password2}
            setPassword2={setPassword2}
            emailError={emailError}
            passwordError={passwordError}
            passwordError2={passwordError2}
            submitError={submitError}
            handleSubmit={handleSubmit}
        />
    );
}
