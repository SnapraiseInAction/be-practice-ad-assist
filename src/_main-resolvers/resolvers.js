"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_query_1 = require("../user/user-query");
const user_mutations_1 = require("../user/resolvers/user.mutations");
exports.resolvers = {
    Query: {
        users: user_query_1.usersQueryResolver,
        user: user_query_1.userQueryResolver,
    },
    Mutation: {
        loginUser: user_mutations_1.userLoginResolver,
        createUser: user_mutations_1.userCreateResolver,
        updateUser: user_mutations_1.userUpdateResolver,
        deleteUser: user_mutations_1.userDeleteResolver,
    },
};
