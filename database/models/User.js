const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  date_joined: { type: String, default: Date.now },
});
let User;
try {
  User = mongoose.model("User");
} catch {
  User = mongoose.model("User", userSchema);
}
export default User;
