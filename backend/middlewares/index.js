import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import url from 'url';
import morganMiddleware from '../utils/morgan/morgan_middleware.js';
import bodyParser from '../utils/bodyParser/body_parser.js';

const middleware =  (app) => {    
    const base_url = url.host;
    const cors_credentials = process.env.NODE_ENV === 'development' ? false : true;

    app.use(express.json());
    app.use(cors({ origin: base_url, credentials: cors_credentials }));
    app.use(cookieParser());
    app.use(bodyParser);
    app.use(express.urlencoded({ extended: false }));
    app.use(morganMiddleware);
    console.log('>>>>>>>>>>>>>>>>>>>>>>       Middlewares configurados        <<<<<<<<<<<<<<<<<<<<<<<<<<<')
};

export default middleware;