import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { authRouter } from './routes';
import { errorMiddleware } from './middleware/error-middleware';

dotenv.config();

const PORT = parseInt(process.env.PORT as string);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
