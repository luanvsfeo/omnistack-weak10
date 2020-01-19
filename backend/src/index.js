const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const {setupWebsocket} = require('./webSocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://luan:luan140@cluster0-14lrf.mongodb.net/week10?retryWrites=true&w=majority',{
   useNewUrlParser: true,useUnifiedTopology: true
});

app.use(express.json())
app.use(cors());
app.use(routes);

server.listen(3333);