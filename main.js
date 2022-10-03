import app from './server.js'

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

server.on('error', error => console.log(`Server error: ${error}`));