const express = require('express');
const userRouter = require('./routes/user');

const app = express();

app.use('/static', express.static('./public'));

app.set('view engine', 'ejs');

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log("The app is running on port 3000");
});