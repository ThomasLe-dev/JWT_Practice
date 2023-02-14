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
            res.status(200).json({
                message: 'Created new user successfully',
                newUser: newUser
            })
            
        }catch(err){
            res.status(500).json({message: err});
        }
    },
}

module.exports = authController;