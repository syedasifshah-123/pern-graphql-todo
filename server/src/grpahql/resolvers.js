import { desc, eq, not } from "drizzle-orm";
import { db } from "../db/config.js";
import { todosTable } from "../db/schema.js";


export const resolvers = {

    Query: {

        todos: async () => {
            try {
                
                const todos = await db.query.todosTable.findMany({
                    orderBy: [desc(todosTable.createdAt)]
                });

                return todos;

            } catch (err) {
                console.log(err);
            }
        },

        todo: async (_, { id }) => {
            const todo = await db.query.todosTable.findFirst({ where: eq(todosTable.id, id) });
            return todo;
        }

    },

    Mutation: {

        createTodo: async (_, { input }) => {

            const { title, description } = input;
            const [newTodo] = await db.insert(todosTable).values({ title, description }).returning();
            return newTodo;

        },

        updateTodo: async (_, { input }) => {

            const { id, newTitle, newDescription } = input;
            const [todo] = await db.update(todosTable).set({
                title: newTitle,
                description: newDescription
            }).where(eq(todosTable.id, id)).returning();

            console.log(todo)

            return todo;
        },

        toggleTodo: async (_, { id }) => {

            const [toggledTodo] = await db.update(todosTable)
                .set({ completed: not(todosTable.completed) })
                .where(eq(todosTable.id, id))
                .returning();

            return !!toggledTodo;
        },

        deleteTodo: async (_, { id }) => {

            const [deletedTodo] = await db.delete(todosTable).where(eq(todosTable.id, id)).returning();
            return !!deletedTodo;

        },

    }

}