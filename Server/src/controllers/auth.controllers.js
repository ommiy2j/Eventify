const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config/config.env' });

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class AuthController {
	static async signUp (req, res) {
		//requesting token for the login
		const { token } = req.body;
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID
		});
		//retrieving data from OAuthClient
		const { name, email, picture } = ticket.getPayload();
		User.exists({ email }, async (err, doc) => {
			if (err) {
				//errot handling
				console.log(err);
				res.status(500);
			} else {
				let user;
				if (doc) {
					//if user exists
					user = await User.findOne({ email });
					// res.status(201).json(user.id);
				} else {
					// adding new user to database
					user = new User({ name, email, picture });
					await user.save();
				}
				//return JSONWebToken
				const payload = {
					user: {
                        id: user.id
					}
				};

				jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 360000 }, (err, token) => {
					if (err) throw err;
					res.json({ token, name, email ,picture});
				});
				// res.status(201).json(user.id);
			}
		});
	}
}

module.exports = AuthController;
