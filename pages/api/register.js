import Joi from "@hapi/joi";
import Connection from "./../../database/Connection";
import User from "./../../database/models/User";
import RequestError from "./../../lib/RequestError";
import nextConnect from "next-connect";
const jwt = require("jsonwebtoken");
const bct = require("bcryptjs");
const handler = nextConnect();

handler.use(Connection); //database connection
handler.post(async (req, res) => {
  // @desc this function will register a user
  const { password, email, name } = req.body;
  // form data validation using joi
  const Schema = Joi.object().keys({
    name: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return res.json(error); // sends error
  }
  // checks if email exist in database
  await User.findOne({ email: email }, (err, foundUser) => {
    if (err) throw err;
    if (foundUser) {
      return res.json(RequestError("email", "email already in use"));
    } else {
      const hashpassword = bct.hashSync(password, 8);
      // creates a new user with data provided
      User.create(
        { email, name, password: hashpassword },
        (err, createdUser) => {
          if (err) throw err;
          // creates token for user
          const token = jwt.sign({ id: createdUser._id }, process.env.KEY);
          const { name, email, date_joined, _id } = createdUser;
          res.json({
            token,
            user: { name, email, dateJoined: date_joined, id: _id },
          });
        }
      );
    }
  });
});
export default handler;
