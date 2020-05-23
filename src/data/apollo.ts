import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI + "/graphql",
  credentials: "include"
});

/**
 * Apollo client to make GraphQL queries to backend
 */
export const apolloClient = new ApolloClient({
  cache,
  link
});
