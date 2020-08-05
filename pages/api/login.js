import Joi from "@hapi/joi";
import nextConnect from "next-connect";
import Connection from "./../../database/Connection";
import RequestError from "./../../lib/RequestError";
import User from "./../../database/models/User";
const bct = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const handler = nextConnect();
handler.use(Connection);
handler.post(async (req, res) => {
  const { email, password } = req.body;
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.json(error);
  } else {
    await User.findOne({ email }, (err, foundUser) => {
      if (err) {
        throw err;
      }
      if (foundUser) {
        const isPasswordValid = bct.compareSync(password, foundUser.password);
        if (isPasswordValid) {
          const token = Jwt.sign({ id: foundUser._id }, process.env.KEY);
          const { name, email, date_joined, _id } = foundUser;
          return res.json({
            token,
            user: { name, email, dateJoined: date_joined, id: _id },
          });
        } else {
          return res.json(RequestError("password", "password is invalid"));
        }
      } else {
        return res.json(RequestError("email", "user not found"));
      }
    });
  }
});
export default handler;
