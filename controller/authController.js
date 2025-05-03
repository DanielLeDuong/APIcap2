const RegisterModel = require('../API/Register')
const jwt = require('jsonwebtoken')


const authController = {
    //register
    register: async (req,res) => {
        try {
            const newUser = await new RegisterModel({
                username: req.body.username,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword,
                email: req.body.email
            })

            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //login
    login: async (req,res) => {
        try {
            const user = await RegisterModel.findOne({username: req.body.username})
            if(user) {
                if(user.password === req.body.password){
                    
                    // access token
                    const accessToken = jwt.sign({
                        id: user.id,
                        role: user.role 
                    },
                    "accessKey",
                    {expiresIn:'1200s'}
                    )
                    // refresh token
                    const refreshToken = jwt.sign({
                        id: user.id,
                        role: user.role 
                    },
                    "refreshKey",
                    {expiresIn:'6d'}
                    )


                    //luu token vao cookies
                    res.cookie("refreshToken",refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: 'strict'
                    })
                    //neu muon loai password khi xuat thong tin thi lam theo cach sau
                    const {password,confirmPassword, ...others} = user._doc
                    res.status(200).json({...others, accessToken})
                    
                } else {
                    const message = res.json("The password is incorrect")
                }
            } else {
                const message = res.json('No existed username')
            }
            

        } catch (error) {
            res.status(500).json(error)
        }
    },

    //refresh token
    requestRefreshToken: async(req,res) => {
        const reqRefreshToken = req.cookie.refreshToken   

    },

    //log out
    logout : async (req,res) => {
        res.clearCookie("refreshToken")
        res.status(200).json("Log out successfully")
    }
}

//luu tru token

module.exports = authController