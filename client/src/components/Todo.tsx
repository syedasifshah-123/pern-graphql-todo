import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_TODO, DELETE_TODO, GET_ALL_TODOS, TOGGLE_TODO } from "../grpahql/queries.ts";
import { useTodoStore } from "../store/todoStore";
import { useEffect, useState } from "react";


const Todo: React.FC = () => {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const { data, loading, error } = useQuery(GET_ALL_TODOS);
    const { todos, setTodos } = useTodoStore();

    const [createTodo, { loading: createTodoLoading }] = useMutation(CREATE_TODO, {
        refetchQueries: [{ query: GET_ALL_TODOS }],
        awaitRefetchQueries: true
    });

    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [{ query: GET_ALL_TODOS }],
        awaitRefetchQueries: true
    })

    const [toggleTodo] = useMutation(TOGGLE_TODO, {
        refetchQueries: [{ query: GET_ALL_TODOS }],
        awaitRefetchQueries: true
    })

    useEffect(() => {
        if (data && data.todos) {
            setTodos(data.todos);
        }
    }, [data, setTodos]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading todos</p>;


    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTodo({
            variables: { input: { title, description } },
        });
        setTitle("");
        setDescription("");
    }


    const handleDeleteTodo = async (id: number) => {
        await deleteTodo({ variables: { id } })
    }


    const handleToggleTodo = async (id: number) => {
        await toggleTodo({ variables: { id } })
    }

    return (
        <div>
            <h2>Todo List</h2>

            <form onSubmit={handleAddTodo}>
                <input type="text" placeholder="enter todo" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} value={title} />
                <input type="text" placeholder="enter todo description" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} value={description} />
                <button
                    onClick={handleAddTodo}
                    disabled={createTodoLoading}
                >Add</button>
            </form>

            <ul>
                {todos.map((todo) => (
                    <p key={todo.id}>
                        {todo.completed ? "✅ " : "❌ "}
                        <strong>{todo.title}</strong> - {todo.description}{" "}
                        <button onClick={() => handleToggleTodo(todo.id)}>✅</button>
                        <button onClick={() => handleDeleteTodo(todo.id)}>❌</button>
                    </p>
                ))}
            </ul>
        </div>
    );
};

export default Todo;