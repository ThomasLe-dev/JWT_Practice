const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req,res,next) => {
        token = req.headers.token;
        if(token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
                if (err) {
                    res.status(403).json('Token is not valid');
                }
                req.user = user;
                next();
            })
        }
        else {
            res.status(401).json('authentication failed');
        }

    },

    veriryTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            // check if user is allowed to delete other users( same id or admin is allowed )
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json('you are not allowed to delete other users');
            }
        });
    }
}

module.exports = middlewareController;
