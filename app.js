const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

// Replace with your MongoDB string
const connectionStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-crqqi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

mongoose.connect(connectionStr, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to database');
    app.listen(3000, () => console.log('Server running: 3000'));
  })
  .catch(err => console.log(err));