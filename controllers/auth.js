const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('shop/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('shop/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};
exports.getSignupFailure = (req, res, next) => {
    console.log('signupFail');
    res.render('/shop/alreadyUser',{
        path: '/Already-User',
        pageTitle: 'Already User',
     });
};
exports.getLoginFailure = (req, res, next) => {
    console.log('loginFail');
    res.render('/shop/nouser',{
        path: '/not-valid-user',
        pageTitle: 'Not Valid User',
     });
    };



exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.redirect('/signup-failure');
      }
      else if(user.password==password){
        res.redirect('/');
      }
      else{
        res.redirect('/signup-failure');
      }
    })

    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  console.log(password);
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        res.redirect('/login-failure');
      }
    
        else{
            const user = new User({
            email: email,
            password: password,
            review: { items: [] }
            })
             user.save();
          res.redirect('/signup-success');
        }
        })
        .catch(err => {
          console.log(err);
        });
};

