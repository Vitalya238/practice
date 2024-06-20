const express = require('express');
const app = express();
const meetupRouter = require('./routers/meetupRouter');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json()); 
app.use('/meetups', meetupRouter);

app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
