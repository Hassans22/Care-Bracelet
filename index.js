import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import bootstrap from './src/index.router.js';

const app = express()
const port = process.env.PORT;

bootstrap(app , express)

app.listen(port, () => {
    console.log(`Server is running on port ........ ${port}`);
})


//import { fileURLToPath } from 'url'
//import path from 'path'
//const __dirname = path.dirname(fileURLToPath(import.meta.url))
//dotenv.config({ path : path.join(__dirname, './config/.env')})