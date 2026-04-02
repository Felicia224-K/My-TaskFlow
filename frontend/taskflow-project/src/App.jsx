import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<AuthGuard> <Dashboard /> </AuthGuard>} />
            </Routes>
        </BrowserRouter>
    );
}


export default App;