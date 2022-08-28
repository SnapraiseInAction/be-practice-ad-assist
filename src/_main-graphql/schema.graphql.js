"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_1 = require("apollo-server");
const auth_gql_1 = require("../authentication/graphql/auth-gql");
const user_gql_1 = require("../user/graphql/user-gql");
const queries_graph_1 = require("./queries-graph");
exports.typeDefs = (0, apollo_server_1.gql) `

  ${queries_graph_1.AllQueriesGQL}

  ${auth_gql_1.AuthType} 

  ${user_gql_1.UserType}

 
  type Mutation {
    
    ${user_gql_1.UserCreate}
    
    ${user_gql_1.LogInUser}

    ${user_gql_1.UpdateUser}

    ${user_gql_1.DeleteUser}

  }
`;
