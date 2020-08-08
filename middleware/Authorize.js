const bct = require("bcryptjs");
import nextConnect from "next-connect";
const jwt = require("jsonwebtoken");
const Authorize = nextConnect();
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
