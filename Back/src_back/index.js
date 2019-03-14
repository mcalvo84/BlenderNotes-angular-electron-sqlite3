import express from 'express';
import consign from 'consign';
import path from 'path';

const app = express();

app.set('rootPath', path.join(__dirname));

consign({
    cwd: __dirname
})
.include('libs/config.js')
.then('controllers.js')
.then('db.js')
.then('libs/middlewares.js')
.then('routes')
.then('libs/boot.js')
.into(app)



