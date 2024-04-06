import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const typeDefs = gql`
   type User {
      id: ID!
      user_name: String!
   }
   type Query {
      User: [User]
   }
`;

const resolvers = {
   Query: {
      User: (_parent, _args, _context) => {
         return client.User.findMany();
      },
   },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
   console.log(`Running on ${url}`);
});
