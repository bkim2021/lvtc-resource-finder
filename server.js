//Express initialized
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));
var Pusher = require('pusher');

Pusher.logToConsole = true;

//Pusher initialized
var pusher = new Pusher({
  appId: '961371',
  key: '01da4d35f71b74689182',
  secret: 'bac445ce0549a9934cfc',
  cluster: 'us3',
  forceTLS: true
});

pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
});

//App routes and responses defined
app.get('/', (req,res) => {  
    res.sendFile('index.html', {root: __dirname});
  });

app.get('/vote', (req, res) => {
    let item = req.query.item_id;
    pusher.trigger('counter', 'vote', {item: item});
    res.status(200).send();
});

//App run
const port = 5000;
app.listen(port, () => { console.log(`App listening on port ${port}!`)});