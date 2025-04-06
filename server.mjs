import express from 'express';
import bodyParser from 'body-parser';
import { createDbTable, insertVariables, selectText } from './db.mjs';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {title : 'mara'});
    createDbTable();
})

app.get('/nume', (req, res) => {
    const value = req.query.text
    console.log(value);
    insertVariables(value);
    selectText(value);
    res.render('result', {data: value});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})