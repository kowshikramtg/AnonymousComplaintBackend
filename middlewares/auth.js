export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const role = req.headers.role;

        if(!role) {
            return res.status(401).json({message: "No role provided"});
        }

        if(role !== requiredRole){
            return res.status(403).json({message: "Access denied"});
        }

        next();
    };
};