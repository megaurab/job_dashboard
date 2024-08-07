import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// MIDDLEWARE FOR JWT AUTHORIZATION:

export const verifyToken = (req, res, next) => {
    const token1 = req.headers["authorization"];
    const token = token1.split(" ")[1];

    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userPass = decoded.password;
        next();
    });
};