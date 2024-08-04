import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function AuthCode() {
    const query = useQuery();
    useEffect(() => {
        async function fetchToken(authCode) {
            const response = await fetch(
                "https://localhost:3080/authcodeexchange",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authCode}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = await response.json();
            if (!response.ok) {
                console.log("Fail", result);
            } else {
                localStorage.setItem("token", result.token);
            }
        }
        const authCode = query.get("authcode");
        fetchToken(authCode);
        setTimeout(() => {
            window.close();
        }, 3000);
    }, [query]);

    return (
        <>
            <p>Login success.</p>
            <p>This window will be closed in a few seconds.</p>
        </>
    );
}
