import { useState, useEffect } from "react";

const useAuth = () => {
    /* Verificar si el token está presente para determinar si el usuario está autenticado */
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si el token está presente para determinar si el usuario está autenticado
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    return {
        token,
        setToken,
        isAuthenticated
    };
};

export default useAuth;
