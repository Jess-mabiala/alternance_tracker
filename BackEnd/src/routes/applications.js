const express = require('express');
const router = express.Router();
const pool = require('../database');
const authMiddleware = require('../middleware/auth')

//GET toutes les candidatures
router.get('/:userId/applications', authMiddleware, async(req, res) =>{
    try {
        const {userId} = req.params;
        console.log('userId reçu:', userId);
        const result  = await pool.query('select * from applications where user_id = $1 order by application_date desc', [userId]);
        console.log('candidatures trouvées:', result.rows);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});



//POST ajouter une candidature
router.post('/:userId/applications', async(req, res) =>{
    try {
        const {userId} = req.params;
        const {company, city, contract_type, offer_link, notes, title} = req.body;
        result = await pool.query('insert into applications(user_id, company, city, contract_type, offer_link, notes, title) values ($1, $2, $3, $4, $5, $6, $7) returning *', [userId, company, city, contract_type, offer_link, notes, title]);
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