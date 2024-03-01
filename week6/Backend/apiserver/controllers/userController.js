const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {expiresIn: '7d'});
};    

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.status(200).json({email, token});
    } catch (error) { res.status(400).json({error: error.message}); };
};

// signup a user
const signupUser = async (req, res) => { 
    const { email, password, roles } = req.body;

    try {
        const user = await User.signup(email, password, roles);
        
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }
    catch (error){
    res.status(400).json({error: error.message})
    }
}

// get all users

const getUsers = async (req, res) => {
    const user_id = req.user._id;
    try {
        const Users = await User.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(Users);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

module.exports = { signupUser, loginUser, getUsers };