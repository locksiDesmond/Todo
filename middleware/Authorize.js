const bct = require("bcryptjs");
import nextConnect from "next-connect";
const jwt = require("jsonwebtoken");
const Authorize = nextConnect();
// @desc this function checks if user has token and throw error
// if none is found otherwise it will decode the token and set the user id to res.decodeId
async function Authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.log("no token found");
    throw new Error("no token found");
  }

  if (!res.decodeId) {
    jwt.verify(token, process.env.KEY, (err, decode) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      }
      res.decodeId = decode.id;
    });
  }
  return next();
}
Authorize.use(Authenticate);
export default Authorize;
