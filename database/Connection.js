const mongoose = require("mongoose");
const { default: nextConnect } = require("next-connect");
let db = null;
async function mongooseConnection(req, res, next) {
  if (!db) {
    try {
      await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        keepAlive: 1,
      });

      db = mongoose.connection;
      db.on("error", (err) => {
        // throw err;
        console.log({ databseError: err });
      });
      // db.on("connected", () => {
      //   console.log("connected to database");
      // });
      return next();
    } catch (e) {
      console.log(e);
    }
  } else {
    // console.log("connecting with cache");
    return next();
  }
}
const Connection = nextConnect();
Connection.use(mongooseConnection);
export default Connection;
