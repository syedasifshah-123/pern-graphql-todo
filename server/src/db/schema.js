import { boolean, pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description").notNull(),
    completed: boolean("completed").default(false),
    createdAt: timestamp("created_at").defaultNow()
});