import { BinaryLike } from "crypto";
import { Router, Request, Response } from "express";
import { gererateSalt, hashedPassword } from "./utils/utils";

const routes = Router();

const signup = `mutation MyMutation($email: String!, $password: String!, $salt: String!) {
    Signup(email: $email, password: $password, salt: $salt) {
      email
      id
    }
  }
  `;



routes.route('/signup').post(
  (request: Request, response: Response) => {
    // success
    return response.json({
      id: "<value>",
      email: "<value>"
    })


  }
);
export { routes };