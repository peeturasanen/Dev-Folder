const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {

         // verify user is authenticated
         const { authorization } = req.headers;
     
         if (!authorization) {
             return res.status(401).json({ error: "Authorization token required" });
         }
     
         const token = authorization.split(" ")[1];
     
         try {
             const { _id } = jwt.verify(token, process.env.SECRET);
     
             req.user = await User.findOne({ _id }).select("_id roles");
             if (!req.user) {
                 return res.status(401).json({ error: "User not found" });
             }
             next();
         } catch (error) {
             console.log(error);
             res.status(401).json({ error: "Request is not authorized" });
         }
}

const admin = (req, res, next) => {
    if (req.user && req.user.roles && req.user.roles.includes("admin")) {
        next();
    } else {
            res.status(401);
            throw new Error("Not authorized as an admin");
    }
};

     
module.exports = {requireAuth, admin};