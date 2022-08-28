"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.UpdateUser = exports.LogInUser = exports.UserCreate = exports.UserType = void 0;
exports.UserType = `
type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
  }
`;
exports.UserCreate = `
  createUser(
    name: String!
    email: String!
    password: String!
  ): User
`;
exports.LogInUser = `
  loginUser(
    email: String!
    password: String!
  ): Auth
`;
exports.UpdateUser = `
  updateUser(
    id: Int!
    name: String
    email: String 
    password: String
  ): User 
`;
exports.DeleteUser = `
  deleteUser(id: Int!): User 
`;
