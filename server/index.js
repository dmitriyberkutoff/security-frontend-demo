const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

const invoices = [{
    id: 1,
    count: 2,
    price: 70,
    time: new Date(Date.now()).toLocaleString()
}];

let bio = 'bio';
let city = 'city';

app.use(cors());

// To parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple request time logger
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    next();
});

app.get('/home', (req, res) => {
    res.send('Home Page');
});

app.get('/invoices', (req, res) => {
    res.send({
        items: invoices
    });
});

app.post('/buy', (req, res) => {
    const invoice = {
        id: invoices.length + 1,
        count: req.body.count,
        price: req.body.price,
        time: new Date(Date.now()).toLocaleString()
    };

    invoices.push(invoice)
    res.send(invoice)
})

app.get('/invoice/:id', (req, res) => {
    res.send({
        ...invoices[+req.params.id-1],
        card: 'card nomber of ' + req.params.id
    })
})

app.get('/info', (req, res) => {
    res.send({
        bio: bio,
        city: city
    })
})

app.post('/saveInfo', (req, res) => {
    bio = req.body.bio;
    city = req.body.city;
    res.send('ok');
})

app.listen(3001, () => console.log('Example app listening on port 3001'));