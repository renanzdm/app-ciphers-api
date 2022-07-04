import { GraphQLClient } from "graphql-request";
import {config} from 'dotenv';
config();
export const client = new GraphQLClient(process.env.HASURA_URL, {
  headers: { "x-hasura-admin-secret": process.env.X_HASURA_ADMIN },
});