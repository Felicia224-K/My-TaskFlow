function TaskCard({ task }) {
    return (
        <div>
            <h4> { task.title } </h4>
            <p> Status: { task.status }</p>
            <p>Priority: { task.priority } </p>
        </div>
    );
}


export default TaskCard;