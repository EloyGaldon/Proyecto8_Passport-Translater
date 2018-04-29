const PASSPORT = require('passport');
const Twiterstrategy=require('passport-twitter').Strategy;
const LOCALSTRATEGY = require('passport-local').Strategy;
let Sequelize = require('sequelize');
let User = require('../models/userSeqModel');
let hash= require('bcrypt-nodejs');


PASSPORT.serializeUser((user, done)=>{
    done(null, user.id);
});

PASSPORT.deserializeUser((id,done)=>{
    //Todo: Implementar modelo de BD
    User.findOne({where:{id:id}}).then(user=>{
        //console.log("Entro en deserialize")
        return done(null, user);
    })
})


PASSPORT.use(new LOCALSTRATEGY({
        usernameField: 'email',
        passwordField: 'password'},
    (username, password, done)=>{
       // console.log('Datos recibidos ->' + username);
        User.findOne({where:{email: username}})
            .then(user=>{
                console.log(user);
                if(!user) return done(null, false, {message: 'El usuario no ha sido identificado'});
                if(!hash.compareSync(password, user.dataValues.hash)) return done(null, false, {message: 'El usuario no ha sido identificado'});
                //console.log("Entro antes del return");
                return done(null, user);
            }).error(err=>{
            return done(err);
        })

    }
));

/* Por terminar */

PASSPORT.use(new Twiterstrategy({
    consumerKey:'xpv5rUHl5oBhDf9AMPIYbg7wG',
    consumerSecret:"EWYlhkt0igmO3ayQxxcRZ009WJs2THhBgB4ih3A5KLNzysTL34",
    calbackURL:"http://127.0.0.1:3000/auth/twitter/callback"
},

    User.findOrCreate({where:{twitterID:id},
        defaults:{
            id:id,
            nombre:,
            email:"nulo",
            password:null,
            hash:null,
            isAdmin:false,
            active:true,
            twitterID:id,
        }
    })

));

module.exports= PASSPORT;
