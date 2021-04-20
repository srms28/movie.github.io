const Product = require('../models/product');
const { Model } = require('mongoose');
const { model } = require('../models/product');
const fs = require('fs');
// const Vector = require('vector-object');
// var striptags = require('striptags');
// var natural = require('natural');
// var TfIdf = natural.TfIdf;
// var tfidf = new TfIdf();

const ContentBasedRecommender = require('content-based-recommender');
const recommender = new ContentBasedRecommender({
  minScore: 0,
  maxSimilarDocuments: 100
});
// let documents = JSON.parse(fs.readFileSync('./data/input1.json','utf8'));
let documents = JSON.parse(fs.readFileSync('./b1.json','utf8'));
let movieData = JSON.parse(fs.readFileSync('./output.json','utf8'));
let movie;


// const documents = [
//   { id: '1000001', content: 'Why studying javascript is fun?' },
//   { id: '1000002', content: 'The trend for javascript in machine learning' },
//   { id: '1000003', content: 'The most insightful stories about JavaScript' },
//   { id: '1000004', content: 'Introduction to Machine Learning' },
//   { id: '1000005', content: 'Machine learning and its application' },
//   { id: '1000006', content: 'Python vs Javascript, which is better?' },
//   { id: '1000007', content: 'How Python saved my life?' },
//   { id: '1000008', content: 'The future of Bitcoin technology' },
//   { id: '1000009', content: 'Is it possible to use javascript for machine learning?' }
// ];

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
  // console.log(documents);
  // let s="";
  recommender.train(documents);


    
  // for(let i=0;i<100;i++){
  //   s=s+' '+ documents[i].toString();
  // }

  let recMovie=[]
  // console.log(s);
//get top 10 similar items to document 1000002
// const similarDocuments = recommender.getSimilarDocuments(movie, 0, 10);
// console.log(similarDocuments);
// for(let i=0;i<similarDocuments.length;i++){
//   console.log(similarDocuments[i].id);
//   for(let j=0;j<movieData.length;j++){
//     if(similarDocuments[i].id==movieData[j].original_title){
//       recMovie.push(movieData[j]);
//       break;
//     }
//   }
  
// }
// console.log(recMovie);
// console.log(movie);
// similarDocuments.toString('utf8');
// console.log(similarDocuments);
  Product.findById(prodId)
  .then(product=>{
    const similarDocuments = recommender.getSimilarDocuments(product.title, 0, 10);
console.log(similarDocuments);
for(let i=0;i<similarDocuments.length;i++){
  console.log(similarDocuments[i].id);
  for(let j=0;j<movieData.length;j++){
    if(similarDocuments[i].id==movieData[j].title){
      recMovie.push(movieData[j]);
      break;
    }
  }
  
}
    res.render('shop/movie',{
      product: product,
      pageTitle: product.title,
      data:recMovie,
      similarDocuments:similarDocuments,
      path: '/',
    });
  })
  .catch(err => console.log(err));
//   Product.findById(prodId)
//   .then(product=>{
//   var spawn = require('child_process').spawn;
//   console.log('hello console');

//   var process = spawn('python', ['./recommend.py',product.title]);
//   process.stdout.on('data', function(data) { 
//     console.log('hello');
//     console.log(data);
//     data.toString('utf8');
//     console.log(data);

//   res.render('shop/movie',{
//     product: product,
//     data:data,
//     pageTitle: product.title,
//     path: '/',
//   })

//     // res.send(data.toString()); 
// } ) 
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


// Product.findById(prodId)
// .then(product=>{
  // var spawn = require('child_process').spawn;
  // console.log('hello console');

  // var process = spawn('python', ['./data/recommend.py',product.title]);
  // process.stdout.on('data', function(data) { 
  //   console.log('hello');
  //   console.log(data);
  //   data.toString('utf8');
  //   console.log(data);

  // res.render('shop/movie',{
  //   product: product,
  //   data:data,
  //   pageTitle: product.title,
  //   path: '/',
  // })

    // res.send(data.toString()); 
// } ) 
// })
// .catch(err => console.log(err));
