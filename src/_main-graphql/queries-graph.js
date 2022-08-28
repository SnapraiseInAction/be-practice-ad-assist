"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllQueriesGQL = void 0;
exports.AllQueriesGQL = `
type Query {
    users: [User]
    user(id: Int!): User
  }
`;
