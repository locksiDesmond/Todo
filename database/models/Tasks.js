const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  list: { type: mongoose.Schema.Types.ObjectId, ref: "Lists", required: true },
  title: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["incomplete", "completed"],
    default: "incomplete",
  },
  date_created: { type: Date, default: Date.now },
  description: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
let Task;
try {
  Task = mongoose.model("Task");
} catch {
  Task = mongoose.model("Task", taskSchema);
}
export default Task;
