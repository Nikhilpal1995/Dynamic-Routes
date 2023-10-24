const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require('./models/cart');
const cartItem = require('./models/cart-item');
//const Expense = require("./models/expense");

const cors = require("cors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");
const CartItem = require("./models/cart-item");
//const expenseRoutes = require("./routes/expense")

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use('/user', userRoutes);
//app.use('/expense', expenseRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


/*sequelize
  .sync()
  .then(result => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });*/

sequelize
  //.sync({force: true})
  .sync()
  .then(result => {
    User.findByPk(1);
    //console.log(result);
  })
  .then(user => {
    if(!user) {
      return User.create({ name: 'Max', email: 'test@test1.com', phonenumber: '9899775',description: 'Simple Description' });
    }
    return user;
  })
  .then(user => {
    //console.log(user);
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
