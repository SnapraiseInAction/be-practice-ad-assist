import { gql } from "apollo-server";

import { AuthType } from "../authentication/graphql/auth-gql";

import {
  UserType,
  UserCreate,
  LogInUser,
  UpdateUser,
  DeleteUser,
} from "../user/graphql/user-gql";

import { AllQueriesGQL } from "./queries-graph";

export const typeDefs = gql`

  ${AllQueriesGQL}

  ${AuthType} 

  ${UserType}

 
  type Mutation {
    
    ${UserCreate}
    
    ${LogInUser}

    ${UpdateUser}

    ${DeleteUser}

  }
`;
