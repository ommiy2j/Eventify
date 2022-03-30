const User = require("../model/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
class AuthController {
  static async signUp(req, res) {
    //requesting token for the login
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    //retrieving data from OAuthClient
    const { name, email, picture } = ticket.getPayload();
    User.exists({ email }, async (err, doc) => {
      if (err) {
        //errot handling
        console.log(err);
        res.status(500);
      } else if (doc) {
        //if user exists
        let user = await User.findOne({ email });
        res.status(201).json(user.id);
      } else {
        // adding new user to database
        let user = new User({ name, email, picture });
        await user.save();
        res.status(201).json(user.id);
      }
    });
  }
}

module.exports = AuthController;
