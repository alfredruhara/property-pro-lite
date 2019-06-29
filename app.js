import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/v1';
import { SUCCESS_CODE, ERROR_CODE, INTERNAL_SERVER_ERROR_CODE } from './server/constantes/statusCodes';
import { BAD_REQUEST_MSG } from './server/constantes/statusMessages';

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
    res.status(SUCCESS_CODE).json({});
  }
  next();
});

// Api Entry
app.use('/api/v1', router);

// Error handling
app.use((req, res, next) => {
  const error = new Error(BAD_REQUEST_MSG);
  error.status = ERROR_CODE;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || INTERNAL_SERVER_ERROR_CODE );
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
