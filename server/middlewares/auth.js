const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { MissingError, VarifyError, NotFound } = require('../utils/error');
require('dotenv').config();
const secret = process.env.SECRET;

const usernameToken = (username) => jwt.sign(username, secret);

const tokenUsername = (token) => {
  const username = jwt.verify(token, secret);
  if (!username) throw VarifyError;
  return username;
};

const checkUser = async (req, res, next) => {
    if (!req.header('Authorization')) throw MissingError;
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = User.findOne({ where: { username: tokenUsername(token) } });
    if (!user) throw new NotFound("帳號不存在");
    res.locals.user = user;
    next();
};

const checkAdmin = async (req, res, next) => {
if (res.locals.user.role !== 'admin') throw VarifyError;
  next();
};

module.exports = {
  usernameToken,
  tokenUsername,
  checkUser,
  checkAdmin
};
