const express = require('express');
const app = express();
const meetupRouter = require('./routers/meetupRouter');

app.use(express.json()); 
app.use('/meetups', meetupRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
