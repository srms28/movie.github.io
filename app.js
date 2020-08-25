const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes=require('./routes/auth');

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  
  User.findById('5f3d5822c226283c7ce91290')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    // 'mongodb+srv://sudhanshu_26:rydSjZB8Xj1ndCtH@cluster0.wbe2b.mongodb.net/Movie?retryWrites=true&w=majority',
       `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wbe2b.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
    ,{ useNewUrlParser: true }
    )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          email: 'sudhanshurohila@gmail',
          password:'sudhanshu2333',
          review: { items: [] }
        });
        user.save();
      }
    });
    console.log('connected!!');
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });
 