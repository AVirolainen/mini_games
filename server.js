const express = require('express');
const path = require('path');

const app = express();

app.use(express.static("public"));

app.use('/',(req,res,next)=>{
        res.sendFile(path.join(__dirname, "public", 'index.html'))
});

app.get('/dinosaur-game',(req,res,next)=>{
    res.send('hello world');
});



app.listen(3000);