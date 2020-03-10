//Express initialized
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));
const Pusher = require('pusher');

//Pusher initialized
const pusher = new Pusher({
    appId: '961371',
    key: '01da4d35f71b74689182',
    secret: 'bac445ce0549a9934cfc',
    cluster: 'us3',
    encrypted: true
})

//App routes and responses defined
app.get('/', (req, res) => {
    res.sendFile('main.html', {root: __dirname});
});

app.get('/vote', (req, res) => {
    let item = req.query.item_id;
    pusher.trigger('counter', 'vote', {item: item});
    res.status(200).send();
})

//App run
const port = 5000;
app.listen(port, () => { console.log('App listening on port ${port}!')});