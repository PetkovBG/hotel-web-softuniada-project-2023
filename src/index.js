const express = require('express');
const viewEngineSetup = require('./config/viewEngine');
const routes = require('./config/routes');
const config = require('./config/config');
const initDB = require('./config/database');
const session = require('express-session');

const app = express();
viewEngineSetup(app);

app.use(express.static('src/static'));
app.use(express.urlencoded({
    extended: false
}));
app.use(session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(routes);

initDB()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on PORT: ${config.PORT}...`)))
    .catch((err) => console.log(err));

