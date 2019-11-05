const express = require('express');
const app = express();

const { config } = require('./config/index');
const usersApi = require('./routes/users')

const {
  logErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers')

//body-parser
app.use(express.json());

usersApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
