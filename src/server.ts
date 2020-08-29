import app from './app';
import config from 'config';

const port = config.get('app.port') as number;

app.listen({ port }, (): void => {
  console.log(`\n🚀 GraphQL is now running on http://localhost:${port}/graphql`);
});
