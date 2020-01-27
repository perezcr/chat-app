const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success'
  });
});

// Set up server
const ioServer = require('./socket')(app);

const port = process.env.PORT || 9000;
ioServer.listen(port, () => console.log(`App running on port ${port}`));
