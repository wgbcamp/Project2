const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const bcrypt = require('bcryptjs');

var db = require('../models')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(function (username, password, done) {
            db.Users.findOne({ where: { username } }).then(function (data) {
                user = data.dataValues
                if (!user) {
                    console.log("user doesn't exist")
                    return done(null, false, { message: 'User does not exist' })
                };

                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err) throw err;

                    if (isMatch) {
                        console.log('success')
                        return done(null, user)
                    } else {
                        console.log("wrong password")

                        return done(null, false, { message: 'Password does not match' })
                    }
                });
            })
        }
        ))

    passport.serializeUser(function (user, done) {
        console.log(user.username + ' serialized')
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        db.Users.findByPk(id).then(function (user) {
            console.log('deserialized')
            done(null, user);
        }).catch(done)
    });
}