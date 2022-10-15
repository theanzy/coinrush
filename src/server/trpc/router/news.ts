import axios from 'axios';
import { t } from '../trpc';
import { z } from 'zod';
import { NEWS_API_URL, NEWS_API_KEY } from '@/utils/env';
function getPreviousDay(numberOfDays: number) {
  const date = new Date();
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - numberOfDays);

  return previous;
}
export const newsRouter = t.router({
  getNews: t.procedure
    .input(
      z.object({
        pageNumber: z.number(),
        perPage: z.number().optional().default(30),
        fromDate: z.date().optional().default(getPreviousDay(3)),
      })
    )
    .mutation(async ({ input }) => {
      const res = await axios.get(
        `${NEWS_API_URL}/everything?q=crypto AND blockchain&from=${input.fromDate
          .getDate()
          .toLocaleString(
            'en-US'
          )}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=10&page=${
          input.pageNumber
        }&language=en`
      );
      const result = res.data;
      const articles = result.articles.map(
        (item: {
          source: { name: string };
          title: string;
          description: string;
          url: string;
          urlToImage: string;
          publishedAt: string;
        }) => {
          return {
            source: item.source.name ?? 'Unknown',
            title: item.title,
            description: item.description,
            url: item.url,
            urlToImage: item.urlToImage,
            publishedAt: item.publishedAt,
          };
        }
      );
      const response = {
        total: result.totalResults,
        data: articles,
      };
      return response;
    }),
});
