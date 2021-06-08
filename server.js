const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const resolvers = require('./resolver');
const typeDefs = require('./schema');
const {createServer} = require('http');

const PORT = 5000;
const app = express();

//put together in apolloserver
const server = new ApolloServer({typeDefs,resolvers})

server.applyMiddleware({
    app,
    path:'/graphql'
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer)


// app.use('/graphql',(req,res)=>{
//     res.send("Welcome to Graphql Api");
// });

httpServer.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}${server.graphqlPath}`);
    
});