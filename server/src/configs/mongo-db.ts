import mongoose, { Error } from 'mongoose';
// import models from '../models';

// connect to the database
mongoose.connect(process.env.MONGO_DB_URI as string, { useNewUrlParser: true }, (err: Error) => {
  if (!err) {
    console.log('connected to the db');
  } else {
    console.log('mongo connection error', err);
  }
});
