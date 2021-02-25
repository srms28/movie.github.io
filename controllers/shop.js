const Product = require('../models/product');
const { Model } = require('mongoose');
const { model } = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Home',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getMovies = (req,res,next)=>{
  Product.find()
    .then(products => {
      console.log(products);
      console.log("movie");
      res.render('shop/movies', {
        prods: products,
        pageTitle: 'Movies',
        path: '/movies'
      });
    })
    .catch(err => {
      console.log(err);
    });
}
exports.getWebSeries = (req,res,next)=>{
  Product.find()
    .then(products => {
      console.log(products);
      console.log("web");
      res.render('shop/web-series', {
        prods: products,
        pageTitle: 'Web Series',
        path: '/web-series'
      });
    })
    .catch(err => {
      console.log(err);
    });
}
exports.getTvSerials = (req,res,next)=>{
  Product.find()
    .then(products => {
      console.log(products);
      console.log("web");
      res.render('shop/tv-serials', {
        prods: products,
        pageTitle: 'TV Serials',
        path: '/tv-serials'
      });
    })
    .catch(err => {
      console.log(err);
    });
}
exports.getMovie=(req,res,next)=>{
  const prodId=req.params.movieId;
  console.log(prodId);

  Product.findById(prodId)
  .then(product=>{
    var spawn = require('child_process').spawn;
    console.log('hello console');
    var process = spawn('python', ['./data/rec1.py',product.title]);
    process.stdout.on('data', function(data) { 
      // console.log('hello');
      data.toString();
    res.render('shop/movie',{
      product: product,
      data:data,
      pageTitle: product.title,
      path: '/',
    })

      // res.send(data.toString()); 
  } ) 
  })
  .catch(err => console.log(err));
  // Product.findById(prodId)
  // .then(product=>{
  //   res.render('shop/movie',{
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/',
  //   });
  // })
  // .catch(err => console.log(err));
}
exports.postReview=(req,res,next)=>{
  const prodId=req.params.movieId;
  const review= req.body.review;
  console.log(prodId);
 
  Product.findById(prodId)
  .then(product1=>{
    product1.review=review;
    return product1.save();
  })
  .then(product=>{
   
    res.redirect('/movie/'+prodId);
  })
  .catch(err => console.log(err));
}


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product=>{
      var spawn = require('child_process').spawn;
      console.log('hello console');
      var process = spawn('python', ['./rec.py',product.title]);
      process.stdout.on('data', function(data) { 
        console.log(data.toString());
        // res.send(data.toString()); 
    } ) 
    })
    .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      console.log('hello console1');
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};
