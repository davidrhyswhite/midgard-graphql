import { PageInfo } from '../types/page-info';

export function toPageInfo(total: number, limit: number, offset: number): PageInfo {
  const hasNextPage = offset + limit < total;
  const nextCursor = hasNextPage ? limit + offset + 1 : null;
  const endCursor = total - limit;

  return {
    nextCursor,
    endCursor,
    hasNextPage,
  };
}
