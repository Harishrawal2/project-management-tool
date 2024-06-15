import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {
    const token = req.header('Authorization'.replace('Bearer', ''));

    if (!token) {
        return res.status(401).json({ msg: 'No token, please try again' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Token is not valid' })
    }
}

export default auth