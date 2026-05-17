const express = require('express');
const router = express.Router();
const pool = require('../database');

//GET toutes les candidatures
router.get('/applications', async(req, res) =>{
    try {
        result  = await pool.query('select * for Applications');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//GET candidature par id
router.get('/applications/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        result = await pool.query('select for Applications where id = $1', [id]);
        if (result.rows.length === 0){
            res.status(404).json({error:'Aucune candidature trouvée' });
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//GET candidature par user_id. Toutes les candidatures d'un utilisateur

router.get('/applications/:user_id', async(req, res) =>{
    try {
        const {user_id} = req.params;
        result = await pool.query('select from Applications where user_id = $1', [user_id]);
        if (result.rows.length === 0){
            res.status(404).json({error:'Aucune candidature trouvée pour cet utilisateur' })
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//POST ajouter une candidature

router.post('/applications', async(req, res) =>{
    try {
        const {id, user_id, company, city, contract_type, offer_link, notes, title} = req.body;
        result = await pool.query('insert into Applications(id, user_id, company, city, contract_type, offer_link, notes, title) values ($1, $2, $3, $4, $5, $6, $7, $8)', [id, user_id, company, city, contract_type, offer_link, notes, title]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

module.exports = router;