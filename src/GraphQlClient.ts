import { GraphQLClient } from "graphql-request";
import {config} from 'dotenv';
config();
export const client = new GraphQLClient('https://app-ciphers.hasura.app/v1/graphql', {
  headers: { "x-hasura-admin-secret":'fcLEQMvV6DOYjmpbFn3ozozlNj2UJejotlrBSJKw8isvgIJHm59gB8c1Hh1FReTU' },
});