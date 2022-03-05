const express = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended: false}));

router.get('/', (req, res) => {
    res.render('user', { greeting: "User Home Page"});
})

const sampleData = [
    { 
        amount: 25.3,
        description: "Lunch with a family"
    },
    { 
        amount: 2.1,
        description: "Transportation"
    },
    {
        amount: 14.0,
        description: "Netflix subscription"
    }
]

router.route('/expenses')
    .get((req, res) => {
        res.render('expenses', {data: sampleData, _method: req.body._method});
    })
    .post((req, res) => {
        res.render('expenses', {data: sampleData, _method: req.body._method});
    })

router.route('/expense/:id')
    .get((req, res) => {
        res.render('edit', {expense: sampleData[req.params.id]})
    })

router.route('/create')
    .get((req, res) => {
        res.render('create', { message: "On this page you can create a new expense"});
    })
    .post((req, res) => {
        res.render('create', { message: "Changes are \"saved\" to the db, would you like to add more?"});
    })

module.exports = router;
