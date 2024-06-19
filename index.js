const express = require('express');
const app = express();
const meetupRouter = require('./routers/meetupRouter');

app.use(express.json()); 
app.use('/meetups', meetupRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
