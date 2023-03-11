const bcrypt = require('bcrypt');
const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authController = {
    register: async (req, res) => {
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            //create a new user
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword
            })
            const user = await newUser.save();
            res.status(200).json({
                message: 'Created new user successfully',
                newUser: user
            })
            
        }catch(err){
            res.status(500).json({message: err});
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({userName: req.body.userName});
            if(!user){
                return res.status(404).json({message: 'User not found'});
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                return res.status(404).json({message: 'Password is incorrect'});
            }
            if(user && validPassword){
                const payload = {
                    id: user.id,
                    admin: user.admin
                }
                const accessToken = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '30s'});
                const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'});

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: 'strict'
                })
                res.status(200).json({user, accessToken});
            }
        }catch(err){
            res.status(500).json({message: err});
        }
    },

    requestRefreshToken: async(req, res) => {
        //take the refresh token from cookie
        const refreshToken = req.cookies.refreshToken;
        res.status(200).json(refreshToken);
    }
}

module.exports = authController;
