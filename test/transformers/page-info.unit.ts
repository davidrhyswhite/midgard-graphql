import { toPageInfo } from '../../src/transformers/page-info';
import { PageInfo } from '../../src/types/page-info';

test('transforms PageInfo from total, limit and offset', () => {
  const pageInfo: PageInfo = toPageInfo(100, 10, 0);

  expect(pageInfo).toStrictEqual({
    endCursor: 90,
    nextCursor: 11,
    hasNextPage: true,
  });
});

test('nextCursor is null whin hasNextPage is false', () => {
  const pageInfo: PageInfo = toPageInfo(100, 91, 10);
  expect(pageInfo.nextCursor).toBeNull();
});

describe('PageInfo.hasNextPage', () => {
  test('is false if offset + limit = total', () => {
    const pageInfo: PageInfo = toPageInfo(100, 90, 10);
    expect(pageInfo.hasNextPage).toBe(false);
  });

  test('is false if offset + limit > total', () => {
    const pageInfo: PageInfo = toPageInfo(100, 91, 10);
    expect(pageInfo.hasNextPage).toBe(false);
  });

  test('is true if offset + limit <>> total', () => {
    const pageInfo: PageInfo = toPageInfo(100, 89, 10);
    expect(pageInfo.hasNextPage).toBe(true);
  });
});
