import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import api from '../services/api';


function ProjectDetail() {
    const { id } = useParams();
    const [ tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get(`/projects/${id}/tasks`)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return(
        <div>
            <h2> Project Tasks</h2>

            {tasks.map(task => (
                <div key={task.id}>
                    <h4> {task.title} </h4>
                    <p> Status: {task.status} </p>
                    <p> Priority: {task.priority} </p>
                </div>

            ))}
        </div>
    );
}


export default ProjectDetail;