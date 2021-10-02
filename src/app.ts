import cors from "cors";
import express from "express";
import morgan from "morgan";
import {createConnection} from 'typeorm';
import PostRouter from "./routes/post.routes";

export default class Server{

    public app : express.Application;
    private port : number;

    constructor() {
        this.app = express();
        if(process.env.PORT !== undefined)
        this.port = parseInt(process.env.PORT);
        else
        this.port = 3000;
    }

    public async startServer(callback : any) {

        try {
            // conectar a DB mssql
            await createConnection();
            console.log(`Connection to DB has been established successfully.`);
            
            // iniciar los middlewares
            this.startMiddlewares();

            // iniciar las rutas API
            this.startRoutes();

            // levantar el servidor en el puerto this.port
            this.app.listen(this.port,callback);

        } catch (error) {
            console.log(error);
        }
        
    }

    private startMiddlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    private startRoutes(){
        this.app.use('/post', new PostRouter().router);
    }

}