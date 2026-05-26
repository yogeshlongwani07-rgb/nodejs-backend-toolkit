const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const { default: axios } = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `

    type User {
        id : ID!
        name : String!
        email : String!
        username : String
      }
        type Todo  {
            userId : ID!
            title : String!
            completed : Boolean
            user : User
        }
            type Query {
                getAllusers : [User]
               getTodos : [Todo]
               getUserById(id : ID!) : User
            }
    `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`,
            )
          ).data,
      },
      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllusers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUserById: async (parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });
  app.use(cors());
  app.use(bodyParse.json());

  await server.start();

  app.use("/graph", expressMiddleware(server));
  app.listen(3000);
}

startServer();
