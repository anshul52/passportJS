
var express = require('express');
const passport = require('passport');
const userModel = require('./users')
var router = express.Router();


const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/profile',isLoggedIn, function(req, res, next) {
  res.render('profile',{username:req.session.passport.user});
})


router.post('/register',function(req,res,next){
  var newUser = new userModel({
    name:req.body.name,
    username:req.body.username,
    age:req.body.age,
  })
  userModel.register(newUser , req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res,function(){
      res.redirect('profile');
    });
  })
  .catch(function(err){
    res.send(err);
    // console.error(err)
  })
})

router.get('/login',function(req,res,next){
  res.render('login')
})

router.post('/login',passport.authenticate('local',
{
  successRedirect : '/profile',
  failureRedirect : '/login'
}),function(req,res,next){ 

})


router.get('/logout',function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }        
}


module.exports = router;

