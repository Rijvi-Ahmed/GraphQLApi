//graphql schema
const typeDefs = `
    type Author{
        id: ID!
        info: Person
    }
    type Person{
        name: String!
        age: Int
        gender: String
    }
    type DeleteMessage{
        id: ID!,
        message: String
    }
    type Query{
        getAuthors:[Author]
        retriveAuthors(id: ID!): Author
    }
    type Mutation{
        createAuthor(name: String!, gender: String!, age: Int!): Author
        updateAuthor(id: ID!, name: String, gender: String, age: Int): Author
        deleteAuthor(id: ID!): DeleteMessage
    }
    type Subscription{
        createAuthorWithSubscription: Author
    }
`;
module.exports = typeDefs;