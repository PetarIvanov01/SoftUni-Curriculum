import Loading from "../Loading";
import { useEffect, useState } from "react"
import TodoList from "./TodoList";

export default function Main() {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3030/jsonstore/todos');
            const data = await response.json();
            setTodos(Object.values(data));
            setLoading(false);
        }

        fetchData();
    }, []);

    const toggleToDoStatus = async (id, value) => {
        let [newId, numb] = id.split('_');
        if (Number(numb) >= 10) {
            newId = numb[0] + newId + '_' + numb[1];
        }
        else {
            newId = id;
        }

        const req = await fetch(`http://localhost:3030/jsonstore/todos/${newId}`, {
            method: 'PUT',
            body: JSON.stringify({
                isCompleted: value ? false : true
            })
        })
        const updatedTodo = await req.json();

        setTodos(prevState => {
            const updatedIndex = prevState.findIndex(todo => todo._id === updatedTodo._id);

            if (updatedIndex === -1) {
                return prevState;
            }

            const updatedTodos = [...prevState];
            updatedTodos[updatedIndex] = updatedTodo;

            return updatedTodos;
        });
    }

    const addNewTodoHandler = async () => {
        const text = prompt('Add new task:')
        if (text) {
            const newTodo = { _id: Date.now().toString(), text, isCompleted: false };
            await fetch('http://localhost:3030/jsonstore/todos',{
                method:'POST',
                body: JSON.stringify(newTodo)
            })
            setTodos(state => [newTodo, ...state]);
        }
    }

    const deleteFunc = async (id) => {
        let [newId, numb] = id.split('_');
        if (Number(numb) >= 10) {
            newId = numb[0] + newId + '_' + numb[1];
        }
        else {
            newId = id;
        }

        await fetch(`http://localhost:3030/jsonstore/todos/${newId}`, {
            method: 'DELETE'
        })

        setTodos((prevState) => {

            return prevState.filter(t => t._id !== id);

        })
    }


    return (
        <main className="main">

            <section className="todo-list-container">
                <h1>Todo List</h1>

                <div className="add-btn-container">
                    <button className="btn" onClick={addNewTodoHandler}>+ Add new Todo</button>
                </div>

                <div className="table-wrapper">

                    {loading ? <Loading /> :
                        <TodoList todos={todos}
                            toggle={toggleToDoStatus}
                            deleteFunc={deleteFunc} />}

                </div>
            </section>
        </main>
    )
}