const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const boardRoutes = require('./routes/boardRoutes');

const app = express();
const PORT = process.env.PORT || 8002;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/kanban_board', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use('/api/boards', boardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


