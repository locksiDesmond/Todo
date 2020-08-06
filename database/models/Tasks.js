const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  list: { type: mongoose.Schema.Types.ObjectId, ref: "Lists", required: true },
  title: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  description: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checked: { type: Boolean, default: false },
});
let Task;
try {
  Task = mongoose.model("Task");
} catch {
  Task = mongoose.model("Task", taskSchema);
}
export default Task;
