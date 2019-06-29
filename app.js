import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// CORPS : allowing orgins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Options',
      'PUT,POST,PATCH,DELETE,GET'
    );
    res.status(200).json({});
  }
  next();
});


// Error handling
app.use((req, res, next) => {
  const error = new Error('Bad request');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
