const express = require("express");
const app = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt")
const User = require("../Model/passport/users");
// Routes
app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) {
			res.status(401);
			res.send("No User Exists");
		} else {
			req.logIn(user, res, (err) => {
				console.dir("here", user, res);
				if (err) throw err;
				res.status(200);
				res.send("Successfully Authenticated");
			});
		}
	})(req, res, next);
});
app.post("/register", (req, res) => {
	User.findOne({ username: req.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send("User Already Exists");
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const newUser = new User({
				username: req.body.username,
				password: hashedPassword,
			});
			await newUser.save();
			res.send("User Created");
		}
	});
});
app.get('/logout', function (req, res){
	req.session.destroy(function (err) {
	  res.redirect('/'); //Inside a callback… bulletproof!
	});
  });
module.exports = app;
