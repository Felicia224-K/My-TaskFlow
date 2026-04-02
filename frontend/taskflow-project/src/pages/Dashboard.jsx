import { useEffect, useState } from 'react';
import api from '../services/api';
import {useNavigate} from 'react-router-dom';


function Dashboard() {
    
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState(null);


    useEffect(() => {
        api.get('/projects')
            .then(res => {
                console.log('My projects:', res.data)
            setProjects(res.data);
            })
            .catch(err => console.log(err));

        api.get('/dashboard')
            .then(res => setStats(res.data))
            .catch(err => console.log(err));
    }, []);


    return (
        <div>
            <h2>Dashboard</h2>

            {/*Stats*/}
            {stats && (
                <div>
                    <p>Total Projects: {projects.length}</p>
                    <p>Total Tasks: {stats.totalTasks} </p>
                    <p>Completed Tasks: {stats.completedTasks} </p>
                </div>
            )}

            {/*Projects*/}
            <h3>Projects</h3>
            {projects.map(p => (
                <div key={p.id}>
                    <h4 onClick={() => navigate(`/projects/${p.id}`)}> { p.title} </h4>
                </div>
            ))}

       </div> 
    );
}

export default Dashboard;