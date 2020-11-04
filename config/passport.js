const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const passport = require('passport');
const GOOGLE_CLIENT_ID = '618050129891-ft3588l9hjn9r6ip4qef4g92uf3kmkh9.apps.googleusercontent.com';

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile);
                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });
            }
        ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
