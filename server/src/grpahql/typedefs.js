import { gql } from "apollo-server-express";


export const typeDefs = gql`

    type Todo {
        id: ID!
        title: String!
        description: String!
        completed: Boolean
    }


    type Query {
        todos: [Todo!]
        todo(id: ID!): Todo
    }


    input CreateTodoInput {
        title: String!
        description: String!
    }


    input UpdateTodoInput {
        id: ID!
        newTitle: String!
        newDescription: String!
    }


    type Mutation {
        createTodo(input: CreateTodoInput!): Todo!
        updateTodo(input: UpdateTodoInput!): Todo!
        deleteTodo(id: ID!): Boolean!
        toggleTodo(id: ID!): Boolean!
    }

`;