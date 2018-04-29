const EXPRESS= require('express');
const ROUTER = EXPRESS.Router();
const PASSPORT = require('../helpers/passportHelper');
// const PASSPORT = require('passport');
// const LOCALSTRATEGY = require('passport-local').Strategy;
// let User = require('../models/user');

// PASSPORT.serializeUser((user, done)=>{
//   done(null, user.id);
// });
//
// PASSPORT.deserializeUser((id,done)=>{
//   //Todo: Implementar modelo de BD
//   User.findById(id).then(user=>{
//     console.log(user);
//     return (null, user);
//   })
// })
//
//
// PASSPORT.use(new LOCALSTRATEGY({passwordField:'pass'},
//   (username, password, done)=>{
//     console.log('Datos recibidos ->' + username);
//     User.findOne({where:{username: username, pass: password}})
//     .then(user=>{
//       if(!user) return done(null, false, {message: 'El usuario no ha sido identificado'});
//       return done(null, user);
//     }).error(err=>{
//       return done(err);
//     })
//
//   }
// ))



ROUTER.get('/',(req,res,next)=>{
    //console.log(req.use)
    res.send("Error");
})

ROUTER.post('/loginuser/', PASSPORT.authenticate('local',{
    failureRedirect: '/users/login', failureFlash:true
}),(req,res, next)=>{
    res.redirect('/');
    //res.redirect(`/login/user/${req.user.id}`);
});

module.exports= ROUTER;