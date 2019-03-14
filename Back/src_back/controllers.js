import fs from 'fs';
import path from 'path';
import PostController from './controllers/posts';

let controllers = null;

module.exports = app => {

    controllers = {
        PostController
    };

    //app.set('controllers', controllers);
    return controllers;
}