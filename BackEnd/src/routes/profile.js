const authMiddleware = require('../middleware/auth');

//Route protégée — nécessite un token valide
router.get('/profile', authMiddleware, async(req,res) =>{
    res.json({message:'Bonjour user #${req.user.id}'});
});