import { gql } from "@apollo/client";


export const GET_ALL_TODOS = gql`
    query {
        todos {
            id
            title
            description
            completed
        }
    }
`;



export const CREATE_TODO = gql`
    mutation CreateTodo($input: CreateTodoInput!) {
        createTodo(input: $input) {
            id
            title
            description
            completed
        }
    }
`;


export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
    }
`;



export const TOGGLE_TODO = gql`
    mutation ToggleTodo($id: ID!) {
        toggleTodo(id: $id)
    }
`;