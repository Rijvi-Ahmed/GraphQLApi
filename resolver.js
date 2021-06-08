const authors = require('./author');
const { PubSub } = require('apollo-server-express');
const pubsub = new PubSub();

const Authors_Topic = "newAuthor";

//the resolver
const resolvers = {
    Query: {
        getAuthors: () => authors,
        retriveAuthors: (obj, { id }) => authors.find(author => author.id == id)
    },
    Mutation: {
        createAuthor: (obj, args) => {
            const id = String(authors.length + 1);
            const { name, gender, age } = args;
            const newAuthor = {
                id,
                info: {
                    name,
                    gender,
                    age
                }
            }
            authors.push(newAuthor);
            pubsub.publish(Authors_Topic, { createAuthorWithSubscription: newAuthor });
            return newAuthor;
        },
        updateAuthor: (obj, { id, name, gender, age }) => {
            const author = authors.find(author => author.id == id);

            if (author) {
                const authorIndex = authors.indexOf(author);
                if (name) author.name = name;
                if (gender) author.gender = gender;
                if (age) author.age = age;

                authors[authorIndex] = { id, info: author };
                return { id, info: author };
            } else {
                throw new Error('Author id cannot found');
            }
        },

        deleteAuthor: (obj, { id }) => {
            const author = authors.find(author => author.id == id);

            if (author) {
                const authorIndex = authors.indexOf(author);
                authors.splice(authorIndex, 1);
                return { id, message: `Author with id ${id} deleted successfully.` };
            } else {
                throw new Error('Author id cannot found');
            }
        }


    },
    Subscription: {
        createAuthorWithSubscription: {
            subscribe: () => pubsub.asyncIterator(Authors_Topic)
        }
    }
};

module.exports = resolvers;