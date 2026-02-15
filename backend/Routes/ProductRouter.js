const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();


router.get( '/' , ensureAuthenticated, (req , res)=>{
    try{
        res.status(200).json([
            {
                name: "mobile",
                price : "10,000"
            },
            {
                name: "tv",
                price : " 20,000"
            }
        ])
    }
    catch(error){
        res.status(403).json({
            message: "error while fetching products data",
            success : false ,
            error,
        })
    }
});

module.exports = router;