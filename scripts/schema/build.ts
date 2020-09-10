import fs from 'fs';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const schema = loadSchemaSync(`${__dirname}/../../src/schema/schema.graphql`, {
  loaders: [new GraphQLFileLoader()],
  includeSources: true,
});

const path = `${__dirname}/../../dist/schema/`;

fs.mkdir(path, { recursive: true }, (err) => {
  if (err) throw err;

  fs.writeFile(`${path}schema.graphql`, schema.extensions.sources[0].body, (err) => {
    if (err) throw err;
  });
});
