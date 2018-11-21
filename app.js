const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 8000;

app.set('trust proxy', 1);
const sslKey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslCert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');

const options = {
  key: sslKey,
  cert: sslCert,
};

// Handlebars middleware
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts',
    partialsDir: 'src/views/partials',
    usersDir: 'src/views/users',
  }));

app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');

// Static folder
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('logregbase');
});

app.get('/register', (req, res) => {
  res.render('logregbase');
});

/* app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});*/

app.listen(port);

https.createServer(options, app).listen(3000, () => {
  console.log(`Server started on port ${port}...`);
});
