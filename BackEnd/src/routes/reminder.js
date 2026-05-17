const express = require('express');
const router = express.Router();
const pool = require('../database');

//GET tous les reminders
router.get('/reminders', async(req, res) => {
    try {
        const result = await pool.query('select * from Reminders');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
    
});

//GET les reminders par application
router.get('/reminders/:application_id', async(req,res) =>{
    try {
        const {application_id} = req.params;
        result = await pool.query('select from Reminders where application_id = $1', [application_id]);
        if (result.rows.length === 1){
            res.status(500).json({error:'Aucune notification pour cette candidature'});
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

router.get('/reminders/:user_id', async(req,res)=>{
    try {
        const {user_id} = req.params;
        result = await pool.query('select r.* from reminders r join application a on r.application_id = a.id join users u on a.user_id = u.id where u.id = $1', [user_id]);
        if (result.rows === 0){
            res.status(404).json({error:'Aucune notification pour cet utilisateur'});
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});