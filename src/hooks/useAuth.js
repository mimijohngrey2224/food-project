import { useState, useEffect } from "react";

const useAuth = () => {
    const [user, setUser] = useState(null);   

useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            try {
                const res = await fetch("https://food-project-api.onrender.com/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem("auth-token")}`
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch user information");
                }

                const data = await res.json();
                console.log(data);
                setUser(data);
            } catch (error) {
                console.log("Error fetching user information", error);
                
            }

        }
    };

    fetchUser();
}, []);

return { user };
};

export default useAuth;