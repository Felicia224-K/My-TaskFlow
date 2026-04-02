import { useEffect, useState } from 'react';
import api from '../services/api';


function Dashboard() {

    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState(null);


    useEffect(() => {
        api.get('/projects')
            .then(res => setProjects(res.data))
            .catch(err => console.log(err));

        api.get('/dashboard')
            .then(res => setStats(res.data.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        api.get('/projects')
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>

            {/*Stats*/}
            {stats && (
                <div>
                    <p>Total Projects: {stats.totalProjects}</p>
                    <p>Total Tasks: {stats.totalTasks} </p>
                    <p>Completed Tasks: {stats.completedTasks} </p>
                </div>
            )}

            {/*Projects*/}
            <h3>Projects</h3>
            {projects.map(p => (
                <div key={p.id}>
                    <h4> { p.name} </h4>
                </div>
            ))}

       </div> 
    );
}

export default Dashboard;