// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const protect = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) return res.status(401).json({ msg: "No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };





// const adminOnly = async (req, res, next) => {
//   const user = await User.findById(req.user.id);

//   if (!user || !user.isAdmin) {
//     return res.status(403).json({ msg: "Admin only access" });
//   }

//   next();
// };



// module.exports = { protect, adminOnly };




const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔐 PROTECT (login check)
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// 🧑‍💻 ADMIN CHECK
const adminOnly = async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  const user = await User.findById(req.user.id);

  if (!user || !user.isAdmin) {
    return res.status(403).json({ msg: "Admin only" });
  }

  next();
};

// ✅ EXPORT BOTH
module.exports = { protect, adminOnly };