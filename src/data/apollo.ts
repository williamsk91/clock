import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI + "/graphql",
  credentials: "include",
});

/**
 * Apollo client to make GraphQL queries to backend
 */
export const apolloClient = new ApolloClient({
  cache,
  link,
});
