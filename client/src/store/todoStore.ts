import { create } from "zustand";


type Todo = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}


type TodoStates = {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
}


export const useTodoStore = create<TodoStates>((set) => ({

    todos: [],
    setTodos: (todos) => set({ todos }),

}));