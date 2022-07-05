import express from "express";
import cors from 'cors';
import { routes } from "./Routes";
const app = express();
app.use(express.json());
app.use(routes);
const corOptions: cors.CorsOptions = {
    allowedHeaders: ["Access-Control-Allow-Origin : *"]
};
app.use(cors(corOptions));
export { app };



