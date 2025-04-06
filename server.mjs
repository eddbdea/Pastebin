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

app.get('/nume', async (req, res) => {
    insertVariables(req.query.text);
    const value = await selectText();
    res.render('result', { value });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})