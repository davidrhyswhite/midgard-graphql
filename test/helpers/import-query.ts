import fs from 'fs';
import path from 'path';

export function importQuery(query: string): string {
  return fs.readFileSync(path.join(__dirname, '../../queries', query), 'utf8').toString();
}
