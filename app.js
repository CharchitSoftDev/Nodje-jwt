const express = require('express');
require('dotenv').config();
require('express-async-errors');
const app = express();

const routes = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(express.static('./public/'));
app.use('/api/v1', routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

try {
    app.listen(process.env.PORT, () => {
        console.log("Server is listing on port 3000");
    });
} catch (err) {
    console.log(err);
}