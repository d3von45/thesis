const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token) return res.status(400).json({msg: "Authentication failed"});

        jwt.verify(token, process.env.ACCESS_TOKEN, (err,user)=> {
            if(err) return res.status(400).json({msg: "Authentication failed 1"});
            console.log(user);
            req.user = user;

            next();
        });

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = auth;