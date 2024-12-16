require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require('./typeDefs/typeDefs')
const resolvers = require('./resolvers/resolvers')

const app = express();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB", err));

const server = new ApolloServer({ typeDefs, resolvers});
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen(process.env.PORT, () => {
        console.log(
            `Servidor rodando em http://localhost:${process.env.PORT}${server.graphqlPath}`
        );
    });
});
