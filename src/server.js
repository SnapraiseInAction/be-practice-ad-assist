"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const apollo_server_1 = require("apollo-server");
const subgraph_1 = require("@apollo/subgraph");
const express_1 = __importDefault(require("express"));
// import resolvers
const resolvers_1 = require("./_main-resolvers/resolvers");
// import schema
const schema_graphql_1 = require("./_main-graphql/schema.graphql");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// instantiate the apollo server
const server = new apollo_server_1.ApolloServer({
    schema: (0, subgraph_1.buildSubgraphSchema)({ typeDefs: schema_graphql_1.typeDefs, resolvers: resolvers_1.resolvers }),
    cors: {
        origin: "*",
        credentials: true,
    },
});
// start the graphql server
server
    .listen()
    .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at ${url}`);
})
    .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(`There was an error - ${error}`);
});
