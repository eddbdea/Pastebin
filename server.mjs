import express from 'express';
import bodyParser from 'body-parser';
import { createDbTable, findText, insertVariables, selectText } from './db.mjs';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

//render form page
app.get('/',  async (req, res) => {
    res.render('index');
    await createDbTable();
})

//insert data into database and show list of texts
app.post('/text/list', async (req, res) => {
    await insertVariables(req.body.textBody);
    const text = await selectText();
    res.render('list', { text });
})

//show complete text
app.get('/text/:userId', async (req, res) => {
    const idValue = req.params.userId;
    const fullText = await findText(idValue);
    res.render('complete-text', {fullText});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})