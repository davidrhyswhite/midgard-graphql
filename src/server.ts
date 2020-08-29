import app from './app';

const port = process.env.PORT || 8082;

app.listen({ port }, (): void => {
  console.log(`\n🚀 GraphQL is now running on http://localhost:${port}/graphql`);
});
