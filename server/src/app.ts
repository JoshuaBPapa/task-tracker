import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {
  authRouter,
  commentsRouter,
  projectsRouter,
  tasksRouter,
  teamsRouter,
  usersRouter,
} from './routes';
import { verifyAccessToken, errorMiddleware } from './middleware';

dotenv.config();

const PORT = parseInt(process.env.PORT as string);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// unprotected routes
app.use('/auth', authRouter);

// protected routes
app.use(verifyAccessToken);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/teams', teamsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
