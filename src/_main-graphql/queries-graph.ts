export const AllQueriesGQL = `
type Query {
    users: [User]
    user(id: Int!): User
  }
`;
