import express from 'express';
import morgan from 'morgan';
import expressHandlebars from 'express-handlebars';
import path from 'path';

module.exports = app => {
    
    const dir = path.join(__dirname, 'models');

    // Settings
    console.log(path.join(app.get('rootPath'), 'views'),);
    app.set('port', process.env.PORT || 3000)

    // Render 
    app.set('views', path.join(app.get('rootPath'), 'views'));
    app.engine('.hbs', expressHandlebars({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('rootPath'), 'views', 'layouts'),
        partialsDir: path.join(app.get('rootPath'), 'views', 'partials'),
        extname: 'hbs',
        helpers: require('./handlebars')
    }));
    app.set('view engine', '.hbs');

    // Global Variables
    app.use((req, res, next) => {
        next();
    })

    // Public
    app.use(express.static(path.join(app.get('rootPath'), 'public')));

    // middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json())

};
