import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {DragDropContext, Droppable,Draggable } from '@hello-pangea/dnd';
import api from '../services/api';

const STATUSES = ['pending', 'in-progress', 'completed'];
function ProjectDetail() {
    const { id } = useParams();
    const [ tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get(`/projects/${id}/tasks`)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }, [id]);


    const getTasksByStatus = (status) =>
        tasks.filter(task => task.status === status);

    const onDragEnd = async (result) => {
        const {destination, source, draggableId} = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId) return;


        const newStatus = destination.droppableId;

        setTasks(prev => prev.map(task =>
            task.id === draggableId
            ? { ...task, status: newStatus }
            :task
        ));

         try {
            await api.patch(`/tasks/${draggableId}/status`, {
                status: newStatus
            });
        } catch (err) {
            console.log(err);
        }
    }

    
    return (
        <div>
            <h2>Project Tasks</h2>

            <DragDropContext onDragEnd={onDragEnd}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    {STATUSES.map(status => (
                        <div key={status} style={{ flex: 1, background: '#f0f0f0', padding: '8px', borderRadius: '8px' }}>
                            <h3>{status.replace('_', ' ').toUpperCase()}</h3>

                            <Droppable droppableId={status}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ minHeight: '100px' }}
                                    >
                                        {getTasksByStatus(status).map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            background: 'white',
                                                            padding: '8px',
                                                            marginBottom: '8px',
                                                            borderRadius: '4px',
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
                                                        <h4>{task.title}</h4>
                                                        <p>Priority: {task.priority}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
   
}


export default ProjectDetail;