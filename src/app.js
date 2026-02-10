import express from 'express';
import bookingsRouter from './routes/bookings.js';

const app = express();

app.use(express.json());

app.use('/bookings', bookingsRouter);

export default app;
