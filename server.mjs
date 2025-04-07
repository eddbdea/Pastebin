import express from 'express';
import bodyParser from 'body-parser';
import { createDbTable, insertVariables, selectText } from './db.mjs';

const app = express();
const port = 3000;
let value = 'null';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('script'));

app.set('view engine', 'ejs');

//render form page
app.get('/',  async (req, res) => {
    res.render('index', {title : 'mara'});
    await createDbTable();
})

//insert data into database and show list of texts
app.post('/list', async (req, res) => {
    await insertVariables(req.body.textBody);
    value = await selectText();
    res.render('list', { value });
})

//show complete text
app.get('/list/complete-text', (req, res) => {
    res.render('complete-text');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})