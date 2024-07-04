const express = require('express');
const app = express();
const meetupRouter = require('./routers/meetupRouter');
const errorHandler = require('./middleware/errorHandler');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const authRouter = require('./routers/authRouter');
const cookieParser = require('cookie-parser');

app.use(express.json()); 

app.use(cookieParser());
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/meetups', meetupRouter);

app.use('/auth', authRouter);

app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
