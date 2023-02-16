const User = require('../Model/User');

const userController = {
    getAllUser: async(req, res) => {
        try {
            const allUser = await User.find();
            res.status(200).json(allUser);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteUser: async(req, res) => {
        try {
            const deleteUser = await User.findById(req.params.id);
            if(!deleteUser){
                res.status(404).json(req.params.id);
            }
            else{
                res.status(200).json({
                    message: 'user deleted successfully',
                    deleteUser: deleteUser
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
}

module.exports = userController;