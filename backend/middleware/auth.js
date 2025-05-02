import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if token is expired
            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < currentTimestamp) {
                return res.status(401).json({ message: 'Token has expired' });
            }

            // Add user from payload
            req.user = decoded;
            next();
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            } else if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token format' });
            } else {
                return res.status(401).json({ message: 'Token verification failed' });
            }
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Server error during authentication' });
    }
};

export default auth;