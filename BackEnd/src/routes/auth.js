const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database')

//Register
router.post('/register', async(req, res) =>{
    try {
        const {username, email, password} = req.body

        //vérifier si l'email existe déja
        const existing = await pool.query('select * from users where email = $1', [email]);
        if (existing.rows.length > 0){
            return res.status(409).json({error:'Email déja utilisé'});
        }

        //Hasher le mot de passe
        const password_hash = await bcrypt.hash(password, 10);

        //Insérer l'utilisateur
        const result = await pool.query('insert into users(name, email, password_hash) values($1, $2, $3) RETURNING *', [username, email, password_hash]);

        const user = result.rows[0];

        //générer le token
        const token = jwt.sign(
            {id:user.id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.status(201).json({user, token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Login
router.post('/login', async(req, res) =>{
    try {
        const {email, password} = req.body;
        //vérifier si l'utilisateur existe
        const result = await pool.query('select * from users where email = $1',[email]);
        if (result.rows.length === 0){
            return res.status(401).json({error:'Email ou mot de passe incorrect'});
        }

        const user = result.rows[0];

        //vérifier le mot de passe
        const isValid = await bcrypt.compare(password, user.password_hash)
        if (!isValid){
            return res.status(401).json({error:'Email ou mot de passe incorrect'});
        }

        //générer le token
        const token = jwt.sign(
            {id:user.id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        //Retourner sans le mot de passe
        const {password: _, ...userWithoutPassword} = user;
        res.json({user: userWithoutPassword, token});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Profil connecté
router.get('/me', require('../middleware/auth'), async(req,res) => {
    try {
        const result = await pool.query('select id, name, email, created_at from users where id = $1', [req.user.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;