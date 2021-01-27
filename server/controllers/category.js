const { Post, Category } = require('../models');
const { Op } = require('sequelize');
const { MissingError, NotFound, BadRequest } = require('../utils/error');

const categoryController = {
  reset: async (req, res, next) => {
    await Category.destroy({ truncate: true, restartIdentity: true });
    await Category.create({ text: '程式' });
    await Category.create({ text: '作品集' });
    await Category.create({ text: '專案' });
    await Category.create({ text: '設計' });
    res.locals.categories = await Category.findAll();
    next();
  },
  getAll: async (req, res) => {
    const categories = await Category.findAll();
    if (categories.length === 0) throw new NotFound('還沒有建立類別');
    return res.status(200).json({ ok: 1, categories });
  },
  getOne: async (req, res) => {
    if (!req.params.id) throw MissingError;
    const category = await Category.findByPk(req.params.id);
    if (!category) throw new NotFound('找不到這個類別');
    return res.status(200).json({ ok: 1, category });
  },
  create: async (req, res) => {
    if (!req.body.text) throw MissingError;
    const [category, created] = await Category.findOrCreate({
      where: { text: req.body.text }
    });
    if (created) throw new BadRequest('類別已經存在，請重新輸入');
    return res.status(201).json({ ok: 1, category });
  },
  update: async (req, res) => {
    if (!req.body.text || !req.params.id) throw MissingError;
    const category = await Category.update(
      { text: req.body.text },
      { where: { id: req.params.id } }
    );
    return res.status(201).json({ ok: 1, category });
  },
  delete: async (req, res) => {
    if (!req.params.id) throw MissingError;
    const count = await Post.count({ where: { CategoryId: req.params.id } });
    if (count > 0) throw new BadRequest(`仍有 ${count} 篇文章使用這個類別`);
    await Category.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ ok: 1 });
  }
};
module.exports = categoryController;
