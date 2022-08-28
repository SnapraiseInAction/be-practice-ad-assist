import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import express from "express";
import cors from "cors";

// import resolvers
import { resolvers } from "./_main-resolvers/resolvers";

// import schema
import { typeDefs } from "./_main-graphql/schema.graphql";

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// instantiate the apollo server
const server = new ApolloServer({
   schema: buildSubgraphSchema({typeDefs, resolvers}),
   cors: {
    origin: "*",
    credentials: true
  },
});

// start the graphql server
server.listen()
    .then(({ url }) => {
       // eslint-disable-next-line no-console
       console.log(`Server ready at ${url}`);
    })
    .catch(error => {
       console.log(`There was an error - ${error}`)
    })
