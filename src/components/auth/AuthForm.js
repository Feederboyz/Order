import { Form } from "react-router-dom";
import "./AuthForm.scss";

export function SignupForm({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    emailError,
    passwordError,
    passwordError2,
    submitError,
    handleSubmit,
}) {
    return (
        <div className={"authform__container"}>
            <div className={"authform__title-container"}>Sign up</div>
            <br />
            <Form onSubmit={handleSubmit} method="post">
                <div className={"authform-form__container"}>
                    <div className={"authform__input-container"}>
                        <input
                            value={username}
                            name="username"
                            placeholder="Enter your name"
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            className={"authform__input-box"}
                        />
                    </div>
                    <br />

                    <div className={"authform__input-container"}>
                        <input
                            value={email}
                            name="email"
                            placeholder="Enter your email"
                            onChange={(event) => setEmail(event.target.value)}
                            className={"authform__input-box"}
                        />
                        <label className="authform__error-label">
                            {emailError}
                        </label>
                    </div>
                    <br />
                    <div className={"authform__input-container"}>
                        <input
                            value={password}
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            className={"authform__input-box"}
                        />
                        <label className="authform__error-label">
                            {passwordError}
                        </label>
                        <br />
                        <input
                            value={password2}
                            name="password2"
                            type="password"
                            placeholder="Confirm your password"
                            onChange={(event) =>
                                setPassword2(event.target.value)
                            }
                            className={"authform__input-box"}
                        />
                        <label className="authform__error-label">
                            {passwordError2}
                        </label>
                        <br />
                    </div>
                    <br />
                    <div className={"authform__input-container"}>
                        <button className={"authform__button"} type="Submit">
                            Submit
                        </button>
                        <label className="authform__error-label">
                            {submitError}
                        </label>
                    </div>
                    <br />
                </div>
            </Form>
        </div>
    );
}

export function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    submitError,
    handleSubmit,
}) {
    return (
        <div className={"authform__container"}>
            <div className={"authform__title-container"}>Login</div>
            <br />
            <Form onSubmit={handleSubmit} method="post">
                <div className={"authform-form__container"}>
                    <div className={"authform__input-container"}>
                        <input
                            value={email}
                            name="email"
                            type="username"
                            autoComplete="username"
                            placeholder="Enter your email"
                            onChange={(event) => setEmail(event.target.value)}
                            className={"authform__input-box"}
                        />
                        <label className="authform__error-label">
                            {emailError}
                        </label>
                    </div>
                    <br />

                    <div className={"authform__input-container"}>
                        <input
                            value={password}
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            className={"authform__input-box"}
                        />
                        <label className="authform__error-label">
                            {passwordError}
                        </label>
                        <br />
                    </div>
                    <br />

                    <div className={"authform__input-container"}>
                        <button className={"authform__button"} type="Submit">
                            Submit
                        </button>
                        <label className="authform__error-label">
                            {submitError}
                        </label>
                    </div>
                    <br />
                    <div className={"authform__input-container"}>
                        <button
                            className={"authform__button"}
                            onClick={() => {
                                window.open(
                                    `${process.env.REACT_APP_BACKEND_URL}/auth/google`,
                                    "_blank",
                                    "width=600,height=600"
                                );
                            }}
                        >
                            Google
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
