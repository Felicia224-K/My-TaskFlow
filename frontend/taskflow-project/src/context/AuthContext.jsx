import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);


    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

     const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };


    // Charge le profil utilisateur au démarrage
    useEffect(() => {
        if (token) {
            api.get('/auth/me')
                .then(res => setUser(res.data))
                .catch(() => {
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

   

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}