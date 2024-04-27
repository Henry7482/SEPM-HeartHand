import jwt from 'jsonwebtoken';

const token = jwt.sign(user, process.env.JWT_SECRET, {expriresIn: '1h'});

res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "none"});
