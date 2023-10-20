import { Application, urlencoded, static as static_ } from 'express'
import { create } from 'express-handlebars'
import setUserSession from '../middlewares/session';
import cookieParser from 'cookie-parser';

const express_config = (app: Application) => {

    const hbs = create({
        extname: '.hbs',
    });
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    app.set('views', './src/views')


    app.use('/static', static_('static'));
    app.use(urlencoded({ extended: true }));
    
    app.use(cookieParser());
    app.use(setUserSession());

}

export default express_config;