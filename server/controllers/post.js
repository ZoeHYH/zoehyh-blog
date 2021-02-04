const { Post, Category } = require('../models');
const { Op } = require('sequelize');
const { MissingError, NotFound, BadRequest } = require('../utils/error');
const { contents } = require('../utils/contents');

const postController = {
  reset: async (req, res, next) => {
    await Post.destroy({ truncate: true, restartIdentity: true, force: true });
    const posts= await Post.bulkCreate(contents);
    res.locals.count = posts.length;
    res.locals.posts = posts;
    next();
  },
  getAll: async (req, res) => {
    const {
      _offset,
      _limit,
      _sort,
      _order,
      query,
      page,
      id,
      title,
      deleted
    } = req.query;
    const options = {
      order: [[_sort || 'updatedAt', _order || 'desc']],
      offset: parseInt(_offset) || 0,
      paranoid: deleted ? false : true,
      include: Category
    };
    if (query)
      options.where = {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { body: { [Op.like]: `%${query}%` } }
        ]
      };
    if (_limit) options.limit = parseInt(_limit);
    if (page) options.offset = parseInt(_limit) * (parseInt(page) - 1);
    if (id) options.where.id = parseInt(id);
    if (title) options.where.title = title;
    const { count, rows } = await Post.findAndCountAll(options);
    if (count === 0) throw new NotFound('還沒有任何文章');
    return res.status(200).json({ ok: 1, count, posts: rows });
  },
  getOne: async (req, res) => {
    if (!req.params.id) throw MissingError;
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: Category
    });
    if (!post) throw new NotFound('找不到你要的文章');
    return res.status(200).json({ ok: 1, post });
  },
  create: async (req, res) => {
    const { image, title, body, CategoryId } = req.body;
    if (!image && !title && !body && !CategoryId) throw MissingError;
    const category = await Category.findByPk(CategoryId);
    if (!category) throw new BadRequest('類別不存在');
    const createdPost = await Post.create({
      image,
      title,
      body,
      CategoryId
    });
    const post = await Post.findOne({
      where: { id: createdPost.id },
      include: Category
    });
    return res.status(201).json({ ok: 1, post });
  },
  update: async (req, res) => {
    const { image, title, body, CategoryId } = req.body;
    if (!image || !title || !CategoryId || !body) throw MissingError;
    const category = await Category.findByPk(CategoryId);
    if (!category) throw new BadRequest('類別不存在');
    const data = {};
    if (image) data.image = image;
    if (title) data.title = title;
    if (body) data.body = body;
    if (CategoryId) data.CategoryId = CategoryId;
    await Post.update(data, { where: { id: req.params.id } });
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: Category
    });
    return res.status(201).json({ ok: 1, post });
  },
  delete: async (req, res) => {
    if (!req.params.id) throw MissingError;
    await Post.destroy({ where: { id: req.params.id } });
    return res.status(200).json({ ok: 1 });
  },
  restore: async (req, res) => {
    if (!req.params.id) throw MissingError;
    await Post.restore({ where: { id: req.params.id } });
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: Category
    });
    if (!post) throw new BadRequest('這篇文章不存在');
    return res.status(200).json({ ok: 1, post });
  }
};
module.exports = postController;
