const authorizeAdmin = (req, res, next) => {
    // Check if user is authenticated
    if (!req.user) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    // Check admin role
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    // User is an admin
    next();
};

module.exports = authorizeAdmin;