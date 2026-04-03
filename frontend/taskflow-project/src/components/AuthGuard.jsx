import { Navigate } from 'react-router-dom';
import { useAuth } from  '../context/AuthContext';

function AuthGuard({children}) {
    const { token, loading } = useAuth();


    if (loading) return  <p>Loading...</p>;

    if (!token) { return <Navigate to='/' /> };

    return children;

}

export default AuthGuard;