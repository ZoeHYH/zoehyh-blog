const { User } = require('../models');
const bcrypt = require('bcrypt');
const { usernameToken } = require('../middlewares/auth');
const {
  MissingError,
  BadRequest,
  NotFound,
  GeneralError
} = require('../utils/error');
const saltRounds = 10;
require('dotenv').config();
const adminPassword = process.env.PASSWORD;

const userController = {
  reset: async (req, res, next) => {
    await User.destroy({ truncate: true, restartIdentity: true });
    const password = await bcrypt.hash(adminPassword, saltRounds);
    await User.create({
      role: 'admin',
      username: 'zoe',
      nickname: 'Zoe',
      password
    });
    next();
  },
  create: async (req, res) => {
    const { nickname, username, password } = req.body;
    if (!nickname || !username || !password) throw MissingError;
    const hash = await bcrypt.hash(password, saltRounds);
    const [user, created] = await User.findOrCreate({
      where: { username },
      defaults: { nickname, password: hash }
    });
    if (!created) throw new BadRequest('帳號已經存在，請登入或重新輸入帳號');
    return res.status(201).json({
      ok: 1,
      token: usernameToken(user.username)
    });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) throw MissingError;
    const user = await User.findOne({ where: { username } });
    if (!user) throw new NotFound('沒有這個帳號');
    bcrypt.compare(password, user.password, (error, succeeded) => {
      if (error) throw new GeneralError(error);
      if (!succeeded) throw new BadRequest('帳號或密碼錯誤');
      return res.status(200).json({
        ok: 1,
        token: usernameToken(user.username)
      });
    });
  },
  verify: async (req, res) =>
    res.status(200).json({
      ok: 1,
      user: res.locals.user
    }),
  delete: async (req, res) => {
    if (!req.params.id) throw MissingError;
    await User.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ ok: 1 });
  }
};
module.exports = userController;
