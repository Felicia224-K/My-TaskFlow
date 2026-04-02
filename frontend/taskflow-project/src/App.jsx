import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import AuthGuard from './components/AuthGuard';
import Dashboard from './pages/dashboard';
import ProjectDetail from './pages/ProjectDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<AuthGuard> <Dashboard /> </AuthGuard>} />
                <Route path='/project' element={<AuthGuard> <ProjectDetail /></AuthGuard>} /> 
                <Route path='/projects/:id' element={<AuthGuard> <ProjectDetail /> </AuthGuard>} />
            </Routes>
        </BrowserRouter>
    );
}


export default App;