const jwt = require('jsonwebtoken')

const middlewareController = {
    //verify token
    verifyToken: (req,res,next) => {
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, "accessKey",(err, user) => {
                if(err){
                    res.status(403).json("Token is not valid")
                }
                req.user = user
                next()
            })
        }
        else {
            res.status(401).json("You 're not authentication")
        }

    },

    //phan quyen xoa tai khoan
    deleteAuth: (req,res,next) => {
        middlewareController.verifyToken(req,res, () => {
            if(req.user.id == req.params.id || req.user.role) {
                next()
            } else {
                res.status(403).json("You are not allow to delete account")
            }
        })
    }
}

module.exports = middlewareController