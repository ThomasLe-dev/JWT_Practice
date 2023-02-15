const bcrypt = require('bcrypt');
const User = require('../Model/User');

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
                res.status(404).json({message: 'User not found'});
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                res.status(404).json({message: 'Password is incorrect'});
            }
            if(user && validPassword){
                res.status(200).json(user);
            }
        }catch(err){
            res.status(500).json({message: err});
        }
    }
}

module.exports = authController;