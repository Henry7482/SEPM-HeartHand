import jwt from "jsonwebtoken";

const jwtAuthDonor = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken.role);
        console.log(decodedToken.role !== 'donor')
        console.log(decodedToken.role !== 'admin')

        if (decodedToken.role !== 'donor' || decodedToken.role !== 'admin') {
            req.userID = decodedToken.userID;
            next();
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.clearCookie("token");
        return res.status(401).send(error.message);
    }
};

const jwtAuthAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.role !== "admin") {
            return res.status(401).send("Unauthorized");
        }
        req.userID = decodedToken.userID;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.status(401).send(error.message);
    }
};

export {jwtAuthDonor, jwtAuthAdmin};
