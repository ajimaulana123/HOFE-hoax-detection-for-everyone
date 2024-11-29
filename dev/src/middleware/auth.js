import jwt from 'jsonwebtoken';

const SECRET_KEY = '<our-secret-key>';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid.' });
        }
        req.user = user; // Tambahkan informasi user ke request
        next();
    });
};

export { authenticateToken };
