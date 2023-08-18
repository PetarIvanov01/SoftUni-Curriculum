export default function Todo({ _id, text, isCompleted, toogleFunc, deleteFunc }) {


    return (
        <tr className={isCompleted ? 'todo is-completed' : 'todo'}>
            <td>{text}</td>
            <td>{isCompleted ? 'Complete' : 'Not Complete'}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => toogleFunc(_id, isCompleted)}>Change status</button>
                <button className="btn todo-btn" onClick={() => deleteFunc(_id)}>Delete</button>
            </td>
        </tr>
    )
}