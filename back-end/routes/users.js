const dotenv = require('dotenv');
dotenv.config();
const router = require('express').Router();
const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const verify = require('../../shared/verifyToken');
const validateInput = require('../../shared/middlewares/validateInput');
const errorHandler = require('../../shared/middlewares/errorHandler'); 
const helmet = require('helmet');
const { formatResponse } = require('../../shared/helpers/responseHelpers');
const checkEmailUniqueness = require('../../shared/middlewares/emailValidation');


router.use(helmet());

//Update User
router.put('/:id', verify,  
    body('username').isAlphanumeric().isLength({ min: 3, max: 20 }).trim().escape(),   
    validateInput,
 async (req, res, next) => {
    try {
        if (req.userId === req.params.id || req.user.isAdmin) {
            const updateUser = { username: req.body.username };
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                { $set: updateUser },
                { new: true }
            );
            const response = formatResponse(updatedUser, false, 'User updated successfully');  
            res.status(200).json(response)
            
            } else {
            const response =  formatResponse(null, true, 'You can update only your account...');
            res.status(403).json(response)
        }
       
    } catch (err){
                next(err)
            }
            
});
// Password Update
router.put('/update-password/:id', verify, [
    body('newPassword').isLength({ min: 6 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    validateInput,
], async (req, res, next) => {
    try {
        const { newPassword, email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json(response);
          } else {
      
            // Validate that userId is the same as the authenticated user's id
            if (req.userId !== req.params.id) {
                const response = formatResponse(null, true, 'You can update only your account...');
                res.status(403).json(response)
            } else {
                
                
                // Hash the new password
                const salt = bcrypt.genSaltSync(process.env.SALT_Rounds || 10);
                const hashedPassword = bcrypt.hashSync(newPassword, salt);


                // Update the user's password in the database
                await User.findByIdAndUpdate(req.userId, { $set: { password: hashedPassword } });

                const response = formatResponse(null, false, 'Password updated successfully');
                res.status(200).json(response)
                //console.log("SALT_Rounds:", process.env.SALT_Rounds);
            }
        }    
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
        return;
            //next(err);
        }
} );
//Delete User
router.delete('/:id', verify, validateInput, async (req, res) => {
    try {
        if (req.user.id === req.params.id || req.user.isAdmin) {
                await User.findByIdAndDelete(req.params.id);   
                const response = formatResponse(null, false, 'User has been deleted!');
                res.status(200).json(response);  
        } else {
                const response = formatResponse(null, true, 'You can delete only your account...');
                res.status(403).json(response);
               }
    } catch (err) {
            next(err);
    }
});
//Find User by ID
router.get('/find/:id', async (req, res) => {
        try{
                const user = await User.findById(req.params.id);
                const { password, ...info } = user._doc;
                const response = formatResponse(info, false, null);
                res.status(200).json(response);
        }    
        catch (err) {
            next(err);
    }
})
// Get All Users
router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    try {
        if ( req.user.isAdmin ) {
                const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
                const response = formatResponse(users, false, null);
                res.status(200).json(response); 
            }  else {
                const response = formatResponse(null, true, 'You are not allowed to see all users!!');
                res.status(403).json(response);
            }
            } catch (err) {
                next(err)
                
            }
        } 
)
router.use(errorHandler);
module.exports = router;