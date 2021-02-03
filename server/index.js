const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const favicon = require('serve-favicon');
const { checkUser } = require('./middlewares/auth');
const userController = require('./controllers/user');
const postController = require('./controllers/post');
const categoryController = require('./controllers/category');
const { handleError } = require('./utils/error');
const app = express();
const port = 5001;
const catchAsyncError = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

app.use(favicon(path.join(__dirname, '..', 'client', 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get(
  '/api/init',
  catchAsyncError(userController.reset),
  catchAsyncError(categoryController.reset),
  catchAsyncError(postController.reset),
  (req, res) =>
    res.status(201).json({
      ok: 1,
      categories: res.locals.categories,
      count: res.locals.count,
      posts: res.locals.posts
    })
);

app.get(
  '/api/users/verify',
  catchAsyncError(checkUser),
  catchAsyncError(userController.verify)
);
app.post('/api/users/register', catchAsyncError(userController.create));
app.post('/api/users/login', catchAsyncError(userController.login));

app.get('/api/posts', catchAsyncError(postController.getAll));
app.get('/api/posts/:id', catchAsyncError(postController.getOne));
app.post(
  '/api/posts',
  catchAsyncError(checkUser),
  catchAsyncError(postController.create)
);
app.patch(
  '/api/posts/:id',
  catchAsyncError(checkUser),
  catchAsyncError(postController.update)
);
app.delete(
  '/api/posts/:id',
  catchAsyncError(checkUser),
  catchAsyncError(postController.delete)
);
app.patch(
  '/api/posts/:id/restore',
  catchAsyncError(checkUser),
  catchAsyncError(postController.restore)
);

app.get('/api/categories', catchAsyncError(categoryController.getAll));
app.get('/api/categories/:id', catchAsyncError(categoryController.getOne));
app.post(
  '/api/categories',
  catchAsyncError(checkUser),
  catchAsyncError(categoryController.create)
);
app.put(
  '/api/categories/:id',
  catchAsyncError(checkUser),
  catchAsyncError(categoryController.update)
);
app.delete(
  '/api/categories/:id',
  catchAsyncError(checkUser),
  catchAsyncError(categoryController.delete)
);

app.use(handleError);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Blog's backend app listening on port ${port}!`);
});
