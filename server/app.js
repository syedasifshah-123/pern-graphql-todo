import express from "express";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./src/grpahql/typedefs.js";
import { resolvers } from "./src/grpahql/resolvers.js";


// EXPRESS SERVER SETUP
const app = express();


// APOLLO SERVER SETUP
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});


await apolloServer.start();
apolloServer.applyMiddleware({ app, path: "/graphql" });



// LISTENING SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});