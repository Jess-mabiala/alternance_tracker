const express = require('express');
const app = express();

app.use(express.json());  //lancer le json

//Routes
app.get('/', (req,res) => {
    res.json({message: 'Hello world!'});
});

app.get('/users', (req,res) =>{
    res.json({id: 1, name: 'Jess'});
});

app.post('/users', (req, res) => {
    const body = req.body;
    res.status(201).json({created: body});
});

app.listen(3000, () => {
    console.log('serveur Express en écoute sur http://localhost:3000');
});