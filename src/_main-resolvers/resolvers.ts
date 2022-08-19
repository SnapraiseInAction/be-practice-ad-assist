import { ResolverTypeWrapper } from "../_generated/graphql";

import { usersQueryResolver, userQueryResolver } from "../user/user-query";

import {
  userLoginResolver,
  userCreateResolver,
  userUpdateResolver,
  userDeleteResolver,
} from "../user/resolvers/user.mutations";

export const resolvers: ResolverTypeWrapper<any> = {
  Query: {
    users: usersQueryResolver,
    user: userQueryResolver,
  },
  Mutation: {
    loginUser: userLoginResolver,
    createUser: userCreateResolver,
    updateUser: userUpdateResolver,
    deleteUser: userDeleteResolver,
  },
};
