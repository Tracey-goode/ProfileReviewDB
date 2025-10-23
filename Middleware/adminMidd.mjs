export const adminAuth = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Admins Only."});
    }
    next();
}