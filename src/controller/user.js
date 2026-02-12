const Users = require('../model/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_TIMEOUT
    })
}

const createUser = async (req, res) => {
    const { email, password, } = req.body;

    try {
        if (!email || !password) {
            return res.json({
                message: 'All fields are required'
            })
        }

        const salt = await bcrypt.genSalt(10);

        const harshPassword = await bcrypt.hash(password, salt);

        const user = {
            email,
            password: harshPassword,
        }

        const authUser = await Users.create(user);
        console.log('AuthUser', authUser);

        res.status(200).json({
            message: 'User document created',
            status: true,
            authUser
        })

    } catch (error) {
        console.log('An error has occur', error.message);
        res.status(501).json({
            message: 'An error has occur',
            err: error
        })
    }
}

const signInUsers = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            message: 'Email and password are required'
        })
    }

    try {
        const userRef = await Users.findOne({
            email
        })

        if (!userRef) {
            return res.json({
                message: 'Invalid crendential used'
            })
        }

        const isMatch = await bcrypt.compare(password, userRef.password);

        if (!isMatch) {
            return res.json({
                message: 'Invalid crendential used'
            })
        }

        const token = generateToken(userRef._id, userRef.email)

        res.status(201).json({
            message: 'User login successful',
            email: userRef.email,
            id: userRef._id,
            token
        })

    } catch (error) {
        console.log('An error has occur', error.message);
        res.status(501).json({
            message: 'An error has occur',
            err: error
        })
    }
}


const checkUser = async (req, res) => {
    const user = req.user;
    try {
        const userId = await Users.findById(user._id);
        if (!userId) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: 'user found',
            userId
        });

    } catch (error) {
        console.error("Get Profile Error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};



module.exports = {
    createUser,
    signInUsers,
    checkUser
}