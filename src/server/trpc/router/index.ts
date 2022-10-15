import { cryptoRouter } from './crypto';
// src/server/trpc/router/index.ts
import { t } from '../trpc';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { newsRouter } from './news';

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  news: newsRouter,
  crypto: cryptoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
