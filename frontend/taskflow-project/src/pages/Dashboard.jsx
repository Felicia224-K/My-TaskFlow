import { useEffect } from 'react';
import api from '../services/api';
function Dashboard() {

    useEffect(() => {
        api.get('/projects')
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <h1>Dashboard</h1>
    );
}

export default Dashboard;