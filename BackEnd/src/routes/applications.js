const express = require('express');
const router = express.Router();
const pool = require('../database');
const authMiddleware = require('../middleware/auth')

//GET toutes les candidatures
router.get('/applications', async(req, res) =>{
    try {
        result  = await pool.query('select * for applications');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//GET candidature par id
router.get('/applications/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        result = await pool.query('select * for applications where id = $1', [id]);
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
        result = await pool.query('select * from applications where user_id = $1', [user_id]);
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
        result = await pool.query('insert into applications(id, user_id, company, city, contract_type, offer_link, notes, title) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *', [id, user_id, company, city, contract_type, offer_link, notes, title]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});


//supprimer une candidature
router.delete('/application', async(req,res) =>{
    try {
        const {id} = req.body;
        result = await pool.query('delete from application where id = $1', [id]);
        res.status(201).json(result.rows);
    } catch (err) {
        res.status(500).json({err:err.message});
    }
})

module.exports = router;