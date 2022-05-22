const res = require('express/lib/response');
const User = require('../models/User');


module.exports = (roles) => {
    return (req, res ,next) => {
        const userRole = req.body.role;
        if(roles.includes(userRole)){
            next();
        } else {
            res.status(400).send("YOU CANT DO IT !");
        }
    };
}