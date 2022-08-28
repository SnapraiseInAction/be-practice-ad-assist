"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueryResolver = exports.usersQueryResolver = void 0;
const server_1 = require("../server");
const usersQueryResolver = async () => {
    const users = await server_1.prisma.user.findMany();
    if (!users) {
        throw new Error("No users found");
    }
    return users;
};
exports.usersQueryResolver = usersQueryResolver;
const userQueryResolver = async (_, { id }) => {
    const user = await server_1.prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, name: true, password: true },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.userQueryResolver = userQueryResolver;
