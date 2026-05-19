const express = require('express');
const app = express();
const helmet = require('helmet'); //sécurise les headers http
const cors = require('cors'); //autorise le front next.js à appeler l'API
require('dotenv').config();

app.use(helmet());
app.use(cors({origin:'http://localhost:3001'}));

app.use(express.json());  //lancer le json

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/users', require('./routes/applications'));


app.listen(3000, () => {
    console.log('serveur Express en écoute sur http://localhost:3000');
});