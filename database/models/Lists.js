const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  no_of_task: { type: Number, default: 0 },
  title: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
let List;
try {
  List = mongoose.model("List");
} catch {
  List = mongoose.model("List", listSchema);
}
export default List;
