import express from 'express';
import bodyParser from 'body-parser';
import { createDbTable, insertVariables } from './db.mjs';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {title : 'mara'});
    createDbTable();
})

app.post('/nume', (req, res) => {
    res.render('result', {name : req.body.text});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})