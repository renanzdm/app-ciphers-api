import { Router, Request, Response, urlencoded } from "express";
import * as bcrypt from 'bcryptjs';
import { client } from "./GraphQlClient";
import { gql } from "graphql-request";
import * as Sentry from "@sentry/node";
import "@sentry/tracing";
const routes = Router();
Sentry.init({
  dsn: "https://d4b9df43317f437c9e671197f36951a3@o1128671.ingest.sentry.io/6551437",
  tracesSampleRate: 1.0,
});

routes.route('/signup').post(
  async (request: Request, response: Response) => {
    const { email, password, name } = request.body.input;
    const saltHash = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, saltHash);

    try {
      const { TBL_USERS } = await client.request(
        gql`query MyQuery($emil: String!) {
          TBL_USERS(where: {user_email: {_eq: $email}}) {
            user_email
          }
        }
        `, {
        "email": email
      }
      )
       if (TBL_USERS.length > 0) {
         return response.status(402).send({
           "message": 'Email ja esta cadastrado'
         });
       } 
  
       const { insert_TBL_USERS } = await client.request(
         gql`mutation MyMutation($user_email:String!,$user_name:String! $user_password:String!) {
         insert_TBL_USERS(objects: {user_email: $user_email, user_name: $user_name, user_password: $user_password}) {
           returning {
             user_id
             user_email
           }
         }
       }`,
         {
           "user_email": email, "user_password": hashedPass, "user_name": name
         }
       );
       const { user_id, user_email } = insert_TBL_USERS['returning'][0];
      return response.status(200).send({
        'id': user_id,
        "email": user_email
      });
    
    } catch (error) {
      Sentry.captureException(error);

      
    }
  }
);


routes.route('/sign').post(
  async (request: Request, response: Response) => {
    const { email, password } = request.body.input;
    try {
      const { TBL_USERS } = await client.request(
        gql`query MyQuery($email: String!) {
          TBL_USERS(where: {user_email: {_eq: $email}}) {
            user_email
            user_password
          }
        }`,
        {
          "email": email
        }
      );
      if (TBL_USERS[0] != null) {
        const { user_email, user_password } = TBL_USERS[0];
        if (user_email == null) {
          return response.status(400).send({
            "message": 'Usuario nao encontrado'
          });
        }
        const isEqualsPass = await bcrypt.compare(password, user_password);
        if (isEqualsPass) {
          return response.status(200).send({
            "token": user_email
          });
        } else {
          return response.status(403).send({
            "message": 'Senha invalida'
          });
        }
      } else {
  
        return response.status(400).send({
          "message": 'Usuario nao encontrado'
        });
  
      }
    } catch (error) {
      Sentry.captureException(error);

    }


   

  }
);

export { routes };