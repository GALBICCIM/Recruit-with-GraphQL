import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		student_id: String!
		phone_number: String!
		email: String
		password: String!
	}

	type Form {
		id: ID!
		intro_self: String!
		because: String!
		capability: String!
		ambition: String!
	}

	type Query {
		User: [User!]
		Form: [Form!]
	}

	type Mutation {
		createUser(name: String!, student_id: String!, phone_number: String!, email: String, password: String!): User
		modifyUser(id: Int!, student_id: String!, password: String!): User
		deleteUser(id: Int!): User

		createForm(intro_self: String!, because: String!, capability: String!, ambition: String!): Form
		deleteForm(id: Int!): Form
		fetchForm(id: Int!): Form
	}
`;

const resolvers = {
	Query: {
		User: (_parent, _args, _context) => {
			return client.User.findMany();
		},
		Form: (_parent, _args, _context) => {
			return client.Form.findMany();
		}
	},
	Mutation: {
		createUser: (_parent, { name, student_id, phone_number, email, password }, _context) => {
			return client.User.create({
				data: {
					name,
					student_id,
					phone_number,
					email,
					password
				}
			});
		},
		modifyUser: (_parent, { id, name, student_id, password }, _context) => {
			return client.User.update({
				where: {
					id,
					student_id,
					password
				},
				data: {
					name
				}
			});
		},
		deleteUser: (_parent, { id, password }, _context) => {
			return client.User.delete({
				where: {
					id,
					password
				}
			});
		},

		createForm: (_parent, { intro_self, because, capability, ambition }, _context) => {
			return client.Form.create({
				data: {
					intro_self,
					because,
					capability,
					ambition
				}
			});
		},
		deleteForm: (_parent, { id }, _context) => {
			return client.Form.delete({
				where: {
					id
				}
			});
		},
		fetchForm: (_parent, { id }, _context) => {
			return client.Form.findMany(id);
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Running on ${url}`);
});
