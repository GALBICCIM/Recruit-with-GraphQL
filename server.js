import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const typeDefs = gql`
   type User {
      id: ID!
      name: String!
      student_id: String!
      phone_number: String!
      email: String!
      password: String!
   }
   type Query {
      User: [User]
   }
   type Mutation {
      createUser(name: String!, student_id: String!, phone_number: String!, email: String, password: String!): User
      modifyUser(id: Int!, student_id: String!, password: String!): User
      deleteUser(id: Int!): User
   }
`;

const resolvers = {
   Query: {
      User: (_parent, _args, _context) => {
         return client.User.findMany();
      },
   },
   Mutation: {
      createUser: (_parent, { name, student_id, phone_number, email, password }, _context) => {
         return client.user.create({
            data: {
               name,
               student_id,
               phone_number,
               email,
               password,
            },
         });
      },
      modifyUser: (_parent, { id, name, student_id, password }, _context) => {
         return client.User.update({
            where: {
               id,
               student_id,
               password,
            },
            data: {
               name,
            },
         });
      },
      deleteUser: (_parent, { id, password }, _context) => {
         return client.User.delete({
            where: {
               id,
               password,
            },
         });
      },
   },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
   console.log(`Running on ${url}`);
});
