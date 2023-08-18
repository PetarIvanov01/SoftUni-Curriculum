import Todo from "./ToDo";

export default function TodoList({ todos, toggle, deleteFunc }) {



    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="table-header-task">Task</th>
                    <th className="table-header-status">Status</th>
                    <th className="table-header-action">Action</th>
                </tr>
            </thead>
            <tbody>

                {todos.map(todo => <Todo key={todo._id} {...todo} toogleFunc={toggle} deleteFunc={deleteFunc} />)}

            </tbody>
        </table>
    )
}