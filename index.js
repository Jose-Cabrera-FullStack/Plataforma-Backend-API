const express = require('express');
const helmet = require('helmet')
const app = express();
const { config } = require('./config/index');

const authApi = require('./routes/auth');
const usersApi = require('./routes/users');
const coursesApi = require('./routes/courses')

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers')

const notFoundHandler = require('./utils/middleware/notFoundHandler')

//body-parser
app.use(express.json());
app.use(helmet());

//Routes
authApi(app)
usersApi(app);
coursesApi(app);

//Catch404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function() {
  // const debug = require('debug')('app:server');
  // debug(`Listening http://localhost:${config.port}`) sirve para hacer debug de las rutas y analizar su rendimiento.
  console.log(`Listening http://localhost:${config.port}`)
});
