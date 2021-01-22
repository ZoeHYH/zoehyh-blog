const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const productController = require('./controllers/product');
const userController = require('./controllers/user');

const app = express();
const port = 5002;
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errMessage');
  next();
});

function redirectBack(req, res) {
  res.redirect(304, 'back');
}

function checkIsLogin(req, res, next) {
  if (!req.session.username) {
    res.redirect('/login');
  } else {
    next();
  }
}

app.get('/', productController.home);

app.get('/login', userController.index);
app.post('/do-login', userController.login, redirectBack);
app.get('/logout', userController.logout);

app.get('/lottery', prizeController.index);
app.get('/admin-lottery', checkIsLogin, prizeController.admin);
app.post('/add-lottery', checkIsLogin, upload.single('image'), prizeController.add, redirectBack);
app.post('/update-image-lottery', checkIsLogin, upload.single('image'), prizeController.updateImg, redirectBack);
app.post('/update-lottery', checkIsLogin, prizeController.update, redirectBack);
app.post('/delete-lottery', checkIsLogin, prizeController.delete, redirectBack);
app.get('/getPrize', cors(), checkIsLogin, prizeController.getPrize);

app.listen(port, () => {
  console.log(`Restaurant's app listening on port ${port}!`);
});
