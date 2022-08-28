"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteResolver = exports.userUpdateResolver = exports.userCreateResolver = exports.userLoginResolver = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const server_1 = require("../../server");
const userLoginResolver = async (_, args) => {
    const user = await server_1.prisma.user.findUnique({
        where: {
            email: args.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });
    if (!user) {
        throw new Error(`No user found for email: ${args.email}`);
    }
    const valid = await bcrypt.compare(args.password, user.password || "");
    if (!valid) {
        throw new Error("Invalid password");
    }
    const jwtSecret = !process.env.JWT_SECRET ? "secret" : process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
    });
    const cookie = `Authorization=${token}; HttpOnly; Max-Age=3600;`;
    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
        },
        token,
        cookie,
    };
};
exports.userLoginResolver = userLoginResolver;
const userCreateResolver = async (_, args) => {
    const user = await server_1.prisma.user.findUnique({
        where: { email: args.email },
    });
    if (user) {
        throw new Error(`User with email: ${args.email} already exists`);
    }
    const hashedPassword = await bcrypt.hash(args.password, 10);
    const newUser = await server_1.prisma.user.create({
        data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
        },
    });
    return newUser;
};
exports.userCreateResolver = userCreateResolver;
const userUpdateResolver = async (_, args) => {
    const user = await server_1.prisma.user.findUnique({ where: { id: args.id } });
    if (!user) {
        throw new Error(`No user found for id: ${args.id}`);
    }
    let hashedPassword = user.password;
    if (args.password) {
        hashedPassword = await bcrypt.hash(args.password, 10);
    }
    if (args.email) {
        const userByEmail = await server_1.prisma.user.findUnique({
            where: { email: args.email },
        });
        if (userByEmail) {
            throw new Error(`User with email: ${args.email} already exists`);
        }
    }
    const updatedUser = await server_1.prisma.user.update({
        where: { id: args.id },
        data: {
            name: args.name,
            email: args.email,
            password: hashedPassword,
        },
    });
    return updatedUser;
};
exports.userUpdateResolver = userUpdateResolver;
const userDeleteResolver = async (_, args) => {
    const user = await server_1.prisma.user.findUnique({ where: { id: args.id } });
    if (!user) {
        throw new Error(`No user found for id: ${args.id}`);
    }
    const deletedUser = await server_1.prisma.user.delete({ where: { id: args.id } });
    return deletedUser;
};
exports.userDeleteResolver = userDeleteResolver;
