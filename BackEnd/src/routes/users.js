const express = require('express');
const router = express.Router();
const pool = require('../database');

//GET tous les utilisateurs
router.get('/users', async(req, res) =>{
    try{
        const result = await pool.query('SELECT * from Users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
    
});

//GET utilisateur par id
router.get('/users/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const result = await pool.query( 'SELECT * from Users where id = $1', [id]);
        if (result.rows.length === 0){
            res.status(404).json({error: 'Utilisateur non trouvé'});
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

//POST créer un utilisateur
router.post('/users', async (req, res) => {
    try{
        const {name, email, password_hash} = req.body;
        const result = await pool.query('INSERT into Users( name, email, password_hash) values ($1, $2, $3)', [name, email, password_hash]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//DELETE supprimer un utilisateur
router.delete('users', async(req,res) =>{
    try {
        const {id} = req.params;
        const result = await pool.query('delete from Users where id = $1',[id]);
    } catch (err) {
        res.status(500).json({error:err.message});
    }

})

module.exports = router;