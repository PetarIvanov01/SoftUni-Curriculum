import "dotenv/config"
import express, { Express } from "express";
import DB_CONFIG from "./config/database";
import express_config from "./config/express";
import router from "./config/routes";
import errorHandler from "./controllers/404";


start()
async function start(): Promise<void> {

    const app: Express = express();

    await DB_CONFIG();
    express_config(app);
    router(app);


    app.get('*', errorHandler);

    app.listen(process.env.PORT,() => {
        return console.log(`Server running on port ${process.env.PORT}`);
    })
}