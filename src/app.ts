import express, { Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import routes from './routes';  // Import routes

const app: Application = express();

// Middleware
app.use(cors());
app.use(helmet());  // For security
app.use(bodyParser.json());  // Parse incoming JSON requests

// Routes
app.use('/api', routes);

export default app;