import { BinaryLike } from "crypto";
import { Router, Request, Response, urlencoded } from "express";
import { gererateSalt, hashedPassword } from "./utils/utils";
import { client } from "./GraphQlClient";
import { gql } from "graphql-request";
const routes = Router();



routes.route('/signup').post(
async  (request: Request, response: Response) => {
  const { email, password, name } = request.body.input;  
  const saltHash = gererateSalt();
  const hashedPass = hashedPassword(password,saltHash);
  const {insert_TBL_USERS} = await client.request(
    gql`mutation MyMutation($user_email:String!,$user_name:String! $user_password:String!,$user_salt:String!) {
      insert_TBL_USERS(objects: {user_email: $user_email, user_name: $user_name, user_password: $user_password, user_salt: $user_salt}) {
        returning {
          user_id
          user_email
        }
      }
    }`,
    {
      "user_email":email,"user_password":hashedPass,"user_salt":saltHash,"user_name":name
    }
  );  

  
    const {user_id,user_email} =   insert_TBL_USERS['returning'][0];
  return response.status(200).send({
    'id':user_id,
    "email":user_email
  });
  }
);


export { routes };