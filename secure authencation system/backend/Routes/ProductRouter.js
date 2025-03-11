const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log(`User ${req.user.email} accessed products`);
    
    res.status(200).json([
        {
            name: "Kettle",
            price: 1000
        },
        {
            name: "Cooler",
            price: 8000
        }
    ]);
});

module.exports = router;
